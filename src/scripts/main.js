import { createApp } from 'vue'
import App from '../app.vue'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'
import '../styles/main.css'

// Remove no-transition class after first paint
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.documentElement.classList.remove('no-transition')
    })
})

// External links open in new tab
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http"]')
    if (link) {
        const linkHost = new URL(link.href).hostname
        if (linkHost !== window.location.hostname) {
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
        }
    }
})

// Remove Baidu analytics script in template
// You can add your own analytics here if you want.

// Hide katex scrollbar after first scroll
document.addEventListener('scroll', (e) => {
    if (e.target.classList && e.target.classList.contains('katex-display')) {
        e.target.classList.add('scrolled')
    }
}, true)

createApp(App).mount('#app')
