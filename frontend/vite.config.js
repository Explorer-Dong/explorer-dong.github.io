import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import MarkdownIt from 'markdown-it'
import mk from '@traptitech/markdown-it-katex'
import matter from 'gray-matter'

function markdown() {
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true }).use(mk)
  return {
    name: 'vite-plugin-markdown',
    transform(code, id) {
      if (!id.endsWith('.md')) return null
      const { data, content } = matter(code)
      const html = md.render(content)
      return {
        code: `export const frontmatter = ${JSON.stringify(data)};\nexport const html = ${JSON.stringify(html)};\nexport default { frontmatter, html };`,
        map: null,
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), markdown()],
  server: {
    port: 5500,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
