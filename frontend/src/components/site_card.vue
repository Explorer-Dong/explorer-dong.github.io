<template>
    <a :href="url" class="card">
        <div ref="placeholderRef" class="card-favicon-placeholder"></div>
        <div class="card-info">
            <span class="card-title">
                {{ title }}
                <span v-for="tag in (tags || [])" :key="tag" class="tag">{{ tag }}</span>
            </span>
            <span class="card-desc">{{ desc }}</span>
        </div>
    </a>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    url: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tags: { type: Array, default: () => [] },
    faviconOverride: { type: String, default: '' },
})

const placeholderRef = ref(null)

function applyFavicon(faviconUrl, placeholder) {
    if (!faviconUrl) {
        if (placeholder) {
            placeholder.style.animation = 'none'
            placeholder.style.background = 'none'
        }
        return
    }
    const img = document.createElement('img')
    img.className = 'card-favicon'
    img.alt = ''
    img.onload = () => {
        if (placeholder) {
            placeholder.classList.add('loaded')
            placeholder.appendChild(img)
        }
    }
    img.onerror = () => {
        if (placeholder) {
            placeholder.style.animation = 'none'
            placeholder.style.background = 'none'
        }
    }
    img.src = faviconUrl
}

function fetchFavicon(origin) {
    return fetch(origin + '/', { mode: 'cors' })
        .then((res) => {
            if (!res.ok) throw new Error(res.status)
            return res.text()
        })
        .then((html) => parseFaviconFromHTML(html, origin))
        .catch(() => {
            const domain = new URL(origin).hostname
            return 'https://www.google.com/s2/favicons?sz=64&domain=' + domain
        })
}

function parseFaviconFromHTML(html, origin) {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const link = doc.querySelector(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel~="icon"]'
    )

    if (!link || !link.getAttribute('href')) {
        return origin + '/favicon.ico'
    }

    const href = link.getAttribute('href')

    if (href.startsWith('data:') || href.startsWith('blob:')) {
        return href
    }

    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
        return href.startsWith('//') ? 'https:' + href : href
    }

    if (href.startsWith('/')) {
        return origin + href
    }

    return origin + '/' + href
}

onMounted(() => {
    const placeholder = placeholderRef.value
    if (props.faviconOverride) {
        applyFavicon(props.faviconOverride, placeholder)
    } else {
        const origin = new URL(props.url).origin
        fetchFavicon(origin).then((faviconUrl) => {
            applyFavicon(faviconUrl, placeholder)
        })
    }
})
</script>
