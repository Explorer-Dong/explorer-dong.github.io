import { createApp } from 'vue'
import App from '../app.vue'
import 'katex/dist/katex.min.css'
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

// Baidu analytics
const _hmt = window._hmt || []
window._hmt = _hmt
    ; (function () {
        const hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?56e04b82ea944342458b4f274efd5bc1'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
    })()

// Hide katex scrollbar after first scroll
document.addEventListener('scroll', (e) => {
    if (e.target.classList && e.target.classList.contains('katex-display')) {
        e.target.classList.add('scrolled')
    }
}, true)

createApp(App).mount('#app')
