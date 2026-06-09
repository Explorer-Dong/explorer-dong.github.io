import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import MarkdownIt from 'markdown-it'
import mk from '@traptitech/markdown-it-katex'
import footnote from 'markdown-it-footnote'
import { full as emoji } from 'markdown-it-emoji'
import matter from 'gray-matter'
import hljs from 'highlight.js'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import userConfig from './config.js'

const basePath = process.env.BASE_PATH || '/'

function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/<[^>]+>/g, '')
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '') || 'section'
}

function withBasePath(path) {
    const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
    return `${base}${path}` || path
}

function resolveInternalLinks(md) {
    const defaultRender = md.renderer.rules.link_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const hrefIndex = tokens[idx].attrIndex('href')
        if (hrefIndex >= 0) {
            let href = tokens[idx].attrs[hrefIndex][1]
            if (href.startsWith('./') && href.endsWith('.md')) {
                const slug = href.replace(/^\.\//, '').replace(/\.md$/, '')
                tokens[idx].attrs[hrefIndex][1] = withBasePath(`/blog/${slug}.html`)
            }
        }
        return defaultRender(tokens, idx, options, env, self)
    }
}

function callouts(md) {
    const labels = {
        note: 'Note',
        tip: 'Tip',
        important: 'Important',
        warning: 'Warning',
    }

    md.core.ruler.after('block', 'callouts', (state) => {
        const tokens = state.tokens
        for (let i = 0; i < tokens.length; i += 1) {
            if (tokens[i].type !== 'blockquote_open') continue
            const marker = tokens[i + 2]
            const match = marker?.type === 'inline' ? marker.content.trim().match(/^\[!(note|tip|important|warning)\]$/i) : null
            if (!match) continue

            const type = match[1].toLowerCase()
            tokens[i].attrJoin('class', `callout callout-${type}`)
            tokens[i].attrSet('data-callout-label', labels[type])
            tokens.splice(i + 1, 3)
        }
    })
}

function createMarkdownRenderer() {
    const toc = []
    let md
    md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight(str, lang) {
            if (lang === 'mermaid') return `<pre class="mermaid">${md.utils.escapeHtml(str)}</pre>`
            const label = lang && hljs.getLanguage(lang) ? lang : 'text'
            const code = lang && hljs.getLanguage(lang)
                ? hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                : md.utils.escapeHtml(str)
            return `<pre class="hljs code-block" data-lang="${md.utils.escapeHtml(label)}"><code>${code}</code></pre>`
        },
    }).use(mk).use(footnote).use(emoji).use(resolveInternalLinks).use(callouts)

    const defaultHeadingOpen = md.renderer.rules.heading_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        const level = Number(tokens[idx].tag.slice(1))
        const inline = tokens[idx + 1]
        if (inline && level >= 2 && level <= 3) {
            const title = inline.content
            const counts = env.headingCounts || (env.headingCounts = new Map())
            const base = slugify(title)
            const count = counts.get(base) || 0
            counts.set(base, count + 1)
            const id = count ? `${base}-${count + 1}` : base
            tokens[idx].attrSet('id', id)
            if (env.toc) env.toc.push({ level, title, id })
        }
        return defaultHeadingOpen(tokens, idx, options, env, self)
    }

    const defaultImage = md.renderer.rules.image || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const src = token.attrGet('src') || ''
        const alt = token.content || token.attrGet('alt') || ''
        const title = token.attrGet('title') || ''
        const image = defaultImage(tokens, idx, options, env, self)
        const caption = alt ? `<figcaption>${md.utils.escapeHtml(alt)}</figcaption>` : ''
        return `<figure class="markdown-figure"><button class="image-zoom-trigger" type="button" data-src="${md.utils.escapeHtml(src)}" data-alt="${md.utils.escapeHtml(alt)}" data-title="${md.utils.escapeHtml(title)}">${image}</button>${caption}</figure>`
    }

    return { md, toc }
}

function renderMarkdown(md, content) {
    const env = { toc: [], headingCounts: new Map() }
    const html = md.render(content, env)
    return { html, toc: env.toc }
}

function markdown() {
    const { md } = createMarkdownRenderer()
    return {
        name: 'vite-plugin-markdown',
        transform(code, id) {
            if (!id.endsWith('.md')) return null
            const { data, content } = matter(code)
            const { html, toc } = renderMarkdown(md, content)
            const sections = content
                .split(/^##\s+/m)
                .map((section) => section.trim())
                .filter(Boolean)
                .map((section) => {
                    const [title, ...body] = section.split('\n')
                    const rendered = renderMarkdown(md, `## ${title.trim()}\n${body.join('\n').trim()}`)
                    return {
                        title: title.trim(),
                        html: rendered.html,
                    }
                })
            return {
                code: `export const frontmatter = ${JSON.stringify(data)};\nexport const html = ${JSON.stringify(html)};\nexport const toc = ${JSON.stringify(toc)};\nexport const sections = ${JSON.stringify(sections)};\nexport default { frontmatter, html, toc, sections };`,
                map: null,
            }
        },
    }
}

function staticHtmlRoutes() {
    return {
        name: 'static-html-routes',
        apply: 'build',
        closeBundle() {
            const dist = join(process.cwd(), 'dist')
            const index = readFileSync(join(dist, 'index.html'), 'utf8')
            const blogDir = join(process.cwd(), 'content', 'blog')
            let blogPosts = []
            try {
                blogPosts = readdirSync(blogDir)
                    .filter((file) => file.endsWith('.md'))
                    .map((file) => file.replace(/\.md$/, ''))
            } catch (e) {
                if (e.code !== 'ENOENT') throw e
            }

            const totalPages = Math.max(1, Math.ceil(blogPosts.length / userConfig.pagination.pageSize))
            const routes = ['domains.html', 'blog.html']
            for (let page = 2; page <= totalPages; page += 1) routes.push(`blog/page/${page}.html`)
            for (const slug of blogPosts) routes.push(`blog/${slug}.html`)

            for (const route of routes) {
                const file = join(dist, route)
                mkdirSync(dirname(file), { recursive: true })
                writeFileSync(file, index)
            }
        },
    }
}

export default defineConfig({
    base: basePath,
    plugins: [vue(), markdown(), staticHtmlRoutes()],
    server: {
        port: 5500,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
})