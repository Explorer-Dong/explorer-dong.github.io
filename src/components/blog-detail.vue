<template>
    <article class="blog-article">
        <a class="blog-back" :href="blogHref" @click.prevent="$emit('back')">← Back to all posts</a>
        <div :class="['blog-article-layout', { 'without-toc': !toc.length }]">
            <div class="blog-article-main">
                <header class="blog-article-header">
                    <h1 class="markdown-body">{{ post.title }}</h1>
                    <div class="blog-meta">
                        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
                    </div>
                </header>

                <div ref="contentRef" class="markdown-body" @click="openImage" v-html="post.html"></div>

                <nav class="blog-nav" aria-label="Post navigation">
                    <a v-if="prevPost" :href="prevPost.href" @click.prevent="$emit('open-post', prevPost.slug)">
                        ← {{ prevPost.title }}
                    </a>
                    <span v-else></span>
                    <a v-if="nextPost" :href="nextPost.href" @click.prevent="$emit('open-post', nextPost.slug)">
                        {{ nextPost.title }} →
                    </a>
                </nav>
            </div>

            <aside v-if="toc.length" class="blog-toc" aria-label="Table of contents">
                <p>Contents</p>
                <a v-for="item in toc" :key="item.id" :href="`#${item.id}`"
                    :class="[`toc-level-${item.level}`, { active: activeHeading === item.id }]">
                    {{ item.title }}
                </a>
            </aside>
        </div>

        <div v-if="zoomImage" class="image-lightbox" role="dialog" aria-modal="true" @click="closeImage">
            <button class="image-lightbox-close" type="button" aria-label="Close image" @click.stop="closeImage">×</button>
            <figure @click.stop>
                <img :src="zoomImage.src" :alt="zoomImage.alt">
                <figcaption v-if="zoomImage.alt">{{ zoomImage.alt }}</figcaption>
            </figure>
        </div>
    </article>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
    post: { type: Object, required: true },
    toc: { type: Array, default: () => [] },
    prevPost: { type: Object, default: null },
    nextPost: { type: Object, default: null },
})

defineEmits(['back', 'open-post'])

const contentRef = ref(null)
const zoomImage = ref(null)
const activeHeading = ref('')
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const blogHref = `${basePath}/blog.html` || '/blog.html'
let mermaidModule

function getMermaidTheme() {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'neutral'
}

function openImage(event) {
    const trigger = event.target.closest?.('.image-zoom-trigger')
    if (!trigger) return
    zoomImage.value = {
        src: trigger.dataset.src,
        alt: trigger.dataset.alt || '',
    }
}

function closeImage() {
    zoomImage.value = null
}

function updateActiveHeading() {
    const headings = props.toc
        .map((item) => document.getElementById(item.id))
        .filter(Boolean)
    if (!headings.length) return

    const current = headings.reduce((active, heading) => {
        return heading.getBoundingClientRect().top <= 96 ? heading : active
    }, headings[0])
    activeHeading.value = current.id
}

async function renderMermaid() {
    await nextTick()
    const diagrams = contentRef.value?.querySelectorAll('.mermaid') || []
    if (!diagrams.length) return
    mermaidModule ||= (await import('mermaid')).default
    mermaidModule.initialize({ startOnLoad: false, theme: getMermaidTheme(), securityLevel: 'strict' })
    await mermaidModule.run({ nodes: diagrams })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

onMounted(() => {
    activeHeading.value = props.toc[0]?.id || ''
    updateActiveHeading()
    renderMermaid()
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', updateActiveHeading))

watch(() => props.post.slug, () => {
    activeHeading.value = props.toc[0]?.id || ''
    nextTick(() => {
        updateActiveHeading()
        renderMermaid()
    })
})
</script>
