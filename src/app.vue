<template>
    <main>
        <header>
            <a class="site-title" :href="routeHref('about')" @click.prevent="goTo('about')">{{ userConfig.title }}</a>
            <div class="header-actions">
                <nav class="nav-bar">
                    <a v-for="item in navItems" :key="item.page"
                        :class="['nav-item', { active: currentPage === item.page }]" :href="routeHref(item.page)"
                        @click.prevent="goTo(item.page)">
                        {{ item.label }}
                    </a>
                </nav>
                <ThemeToggle />
            </div>
        </header>

        <section v-if="currentPage === 'about'" class="about-stack" aria-label="About Vincent">
            <article v-for="section in aboutSections" :key="section.title" class="about-section markdown-body"
                v-html="section.html"></article>
        </section>

        <section v-else-if="currentPage === 'domains'" class="sites">
            <h2>{{ domainsTitle }}</h2>
            <div class="card-grid">
                <SiteCard v-for="site in sites" :key="site.url" :url="site.url" :title="site.title" :desc="site.desc"
                    :tags="site.tags" :favicon-override="site.faviconOverride" />
            </div>
        </section>

        <BlogList v-else-if="currentPage === 'blog' && !currentSlug" :posts="posts" :current-page="currentBlogPage"
            @open-post="goTo('blog', $event)" @open-page="goToBlogPage" />

        <BlogDetail v-else-if="currentPage === 'blog' && currentPost" :post="currentPost" :toc="currentPost.toc"
            :prev-post="prevPost" :next-post="nextPost" @back="goTo('blog')" @open-post="goTo('blog', $event)" />

        <section v-else class="not-found">
            <h2>Post not found</h2>
            <p>The post you requested does not exist.</p>
            <a :href="routeHref('blog')" @click.prevent="goTo('blog')">Back to Blog</a>
        </section>


        <footer>
            <p>&copy; {{ userConfig.year }} {{ userConfig.author }}</p>
            <div class="footer-links">
                <template v-for="(link, index) in userConfig.footerLinks" :key="link.label">
                    <a :href="link.url">{{ link.label }}</a>
                    <span v-if="index < userConfig.footerLinks.length - 1" class="separator">&middot;</span>
                </template>
            </div>
        </footer>
    </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import userConfig from '../config.js'
import ThemeToggle from './components/theme_toggle.vue'
import SiteCard from './components/site_card.vue'
import BlogList from './components/blog-list.vue'
import BlogDetail from './components/blog-detail.vue'
import { frontmatter as domainsFrontmatter } from '../content/domains.md'
import { sections as aboutSections } from '../content/index.md'
import defaultFavicon from './assets/bulb.svg'

const blogModules = import.meta.glob('../content/blog/*.md', { eager: true })
const validPages = ['about', 'domains', 'blog']
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const navItems = [
    { page: 'domains', label: 'Domains' },
    { page: 'blog', label: 'Blog' },
]

const domainsTitle = domainsFrontmatter.title || 'Domains'
const sites = domainsFrontmatter.sites || []
const tabTitle = userConfig.tabTitle || userConfig.title || 'WithU'
const favicon = userConfig.favicon === '/src/assets/bulb.svg' ? defaultFavicon : userConfig.favicon || defaultFavicon

function applyDocumentMeta() {
    document.title = tabTitle
    let icon = document.querySelector('link[rel="icon"]')
    if (!icon) {
        icon = document.createElement('link')
        icon.rel = 'icon'
        document.head.appendChild(icon)
    }
    icon.href = favicon === defaultFavicon || !favicon.startsWith('/') ? favicon : withBasePath(favicon)
}

applyDocumentMeta()

const posts = Object.entries(blogModules)
    .map(([path, module]) => {
        const slug = path.split('/').pop().replace(/\.md$/, '')
        const frontmatter = module.frontmatter || {}
        return {
            slug,
            href: routeHref('blog', { slug }),
            title: frontmatter.title || slug,
            date: frontmatter.date || '1970-01-01',
            tags: frontmatter.tags || [],
            summary: frontmatter.summary || '',
            cover: frontmatter.index_img || '',
            html: module.html || '',
            toc: module.toc || [],
        }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

function stripBasePath(path) {
    if (!basePath || !path.startsWith(basePath)) return path
    return path === basePath ? '/' : path.slice(basePath.length) || '/'
}

function withBasePath(path) {
    return `${basePath}${path}` || path
}

function getRoute() {
    const path = stripBasePath(window.location.pathname).replace(/\/+$/, '') || '/'
    if (path === '/' || path.endsWith('/index.html')) return { page: 'about', slug: '', blogPage: 1 }
    if (path.endsWith('/domains.html')) return { page: 'domains', slug: '', blogPage: 1 }
    if (path.endsWith('/blog.html')) return { page: 'blog', slug: '', blogPage: 1 }

    const blogPageMatch = path.match(/\/blog\/page\/(\d+)\.html$/)
    if (blogPageMatch) return { page: 'blog', slug: '', blogPage: Math.max(1, Number(blogPageMatch[1])) }

    const blogPostMatch = path.match(/\/blog\/([^/]+)\.html$/)
    if (blogPostMatch) return { page: 'blog', slug: blogPostMatch[1], blogPage: 1 }

    return { page: 'about', slug: '', blogPage: 1 }
}

const route = getRoute()
if (stripBasePath(window.location.pathname).endsWith('/index.html')) window.history.replaceState({}, '', routeHref('about'))
const currentPage = ref(validPages.includes(route.page) ? route.page : 'about')
const currentSlug = ref(route.slug)
const currentBlogPage = ref(route.blogPage)
const currentPost = computed(() => posts.find((post) => post.slug === currentSlug.value) || null)
const currentPostIndex = computed(() => posts.findIndex((post) => post.slug === currentSlug.value))
const prevPost = computed(() => currentPostIndex.value > 0 ? posts[currentPostIndex.value - 1] : null)
const nextPost = computed(() => currentPostIndex.value >= 0 && currentPostIndex.value < posts.length - 1 ? posts[currentPostIndex.value + 1] : null)

function routeHref(page, options = {}) {
    if (page === 'about') return withBasePath('/')
    if (page === 'domains') return withBasePath('/domains.html')
    if (page === 'blog' && options.slug) return withBasePath(`/blog/${options.slug}.html`)
    if (page === 'blog' && options.blogPage && options.blogPage > 1) return withBasePath(`/blog/page/${options.blogPage}.html`)
    return withBasePath('/blog.html')
}

function onPopState() {
    const nextRoute = getRoute()
    currentPage.value = validPages.includes(nextRoute.page) ? nextRoute.page : 'about'
    currentSlug.value = nextRoute.slug
    currentBlogPage.value = nextRoute.blogPage
}

function goTo(page, slug = '') {
    currentPage.value = page
    currentSlug.value = slug
    currentBlogPage.value = 1
    window.history.pushState({}, '', routeHref(page, { slug }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToBlogPage(page) {
    currentPage.value = 'blog'
    currentSlug.value = ''
    currentBlogPage.value = page
    window.history.pushState({}, '', routeHref('blog', { blogPage: page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('popstate', onPopState))
onUnmounted(() => window.removeEventListener('popstate', onPopState))
</script>
