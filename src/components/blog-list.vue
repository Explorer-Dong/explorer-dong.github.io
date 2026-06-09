<template>
    <section class="blog-list" aria-label="Blog posts">
        <div class="blog-toolbar">
            <input v-model="query" class="blog-search" type="search" placeholder="Search posts..." aria-label="Search posts">
            <div v-if="tags.length" class="blog-tag-filter" aria-label="Filter by tag">
                <button v-for="tag in tags" :key="tag" type="button" :class="['tag-filter', { active: selectedTag === tag }]"
                    @click="toggleTag(tag)">
                    {{ tag }}
                </button>
            </div>
        </div>

        <p v-if="!filteredPosts.length" class="blog-empty">No posts found.</p>

        <div v-else class="blog-list-layout">
            <aside class="blog-timeline" aria-label="Blog timeline">
                <div v-for="group in allGroupedPosts" :key="group.year">
                    <div class="blog-timeline-year">{{ group.year }}</div>
                    <button v-for="month in group.months" :key="month.key" type="button"
                        :class="['blog-timeline-month', { active: (selectedMonth || activeMonth) === month.key }]"
                        @click="toggleMonth(month.key)">
                        <span>{{ month.label }}</span>
                        <span class="blog-timeline-count">{{ month.count }}</span>
                    </button>
                </div>
            </aside>

            <div class="blog-list-main">
                <div v-for="group in groupedPosts" :key="group.year" class="blog-year-group">
                    <h2>{{ group.year }}</h2>
                    <div v-for="month in group.months" :key="month.key" :ref="(el) => setMonthRef(month.key, el)"
                        class="blog-month-group">
                        <h3>{{ month.label }}</h3>
                        <article v-for="post in month.posts" :key="post.slug"
                            :class="['blog-post-item', { 'cover-right': post.pageIndex % 2 === 1 }]">
                            <a class="blog-post-cover" :href="post.href" @click.prevent="emit('open-post', post.slug)"
                                aria-label="Open post">
                                <img v-if="post.cover" :src="post.cover" :alt="post.title" loading="lazy">
                                <span v-else class="blog-post-cover-placeholder" aria-hidden="true"></span>
                            </a>
                            <div class="blog-post-content">
                                <time class="blog-post-date" :datetime="post.date">{{ formatDate(post.date) }}</time>
                                <a class="blog-post-title" :href="post.href" @click.prevent="emit('open-post', post.slug)">
                                    {{ post.title }}
                                </a>
                                <p v-if="post.summary" class="blog-post-summary">{{ post.summary }}</p>
                                <div v-if="post.tags.length" class="blog-post-tags">
                                    <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>

                <nav v-if="totalPages > 1" class="blog-pagination" aria-label="Blog pagination">
                    <a v-for="page in totalPages" :key="page" :href="pageHref(page)"
                        :class="['blog-page-link', { active: page === safeCurrentPage }]"
                        @click.prevent="emit('open-page', page)">
                        {{ page }}
                    </a>
                </nav>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const PAGE_SIZE = 5
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

const props = defineProps({
    posts: { type: Array, required: true },
    currentPage: { type: Number, default: 1 },
})

const emit = defineEmits(['open-post', 'open-page'])

const query = ref('')
const selectedTag = ref('')
const selectedMonth = ref('')
const activeMonth = ref('')
const monthRefs = new Map()

const orderedPosts = computed(() => {
    return [...props.posts].sort((a, b) => new Date(b.date) - new Date(a.date))
})

const tags = computed(() => {
    const allTags = orderedPosts.value.flatMap((post) => post.tags || [])
    return [...new Set(allTags)].sort((a, b) => a.localeCompare(b))
})

function getMonthKey(dateString) {
    const date = new Date(dateString)
    const year = String(date.getFullYear())
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}

const allGroupedPosts = computed(() => {
    const years = new Map()

    for (const post of orderedPosts.value) {
        const date = new Date(post.date)
        const year = String(date.getFullYear())
        const monthKey = getMonthKey(post.date)
        const monthLabel = date.toLocaleDateString('en', { month: 'long' })

        if (!years.has(year)) years.set(year, new Map())
        const months = years.get(year)
        if (!months.has(monthKey)) months.set(monthKey, { key: monthKey, label: monthLabel, count: 0 })
        months.get(monthKey).count++
    }

    return [...years.entries()].map(([year, months]) => ({
        year,
        months: [...months.values()],
    }))
})

function normalizeSearchText(value) {
    return String(value || '').replace(/<[^>]*>/g, ' ').toLowerCase()
}

const filteredPosts = computed(() => {
    const normalizedQuery = query.value.trim().toLowerCase()
    return orderedPosts.value.filter((post) => {
        const matchesTag = !selectedTag.value || post.tags.includes(selectedTag.value)
        const matchesMonth = !selectedMonth.value || getMonthKey(post.date) === selectedMonth.value
        const haystack = [post.title, post.summary, post.html, ...post.tags].map(normalizeSearchText).join(' ')
        const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery)
        return matchesTag && matchesQuery && matchesMonth
    })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / PAGE_SIZE)))
const safeCurrentPage = computed(() => Math.min(Math.max(1, props.currentPage), totalPages.value))
const paginatedPosts = computed(() => {
    const start = (safeCurrentPage.value - 1) * PAGE_SIZE
    return filteredPosts.value.slice(start, start + PAGE_SIZE).map((post, pageIndex) => ({ ...post, pageIndex }))
})

const groupedPosts = computed(() => {
    const years = new Map()

    for (const post of paginatedPosts.value) {
        const date = new Date(post.date)
        const year = String(date.getFullYear())
        const monthKey = getMonthKey(post.date)
        const monthLabel = date.toLocaleDateString('en', { month: 'long' })

        if (!years.has(year)) years.set(year, new Map())
        const months = years.get(year)
        if (!months.has(monthKey)) months.set(monthKey, { key: monthKey, label: monthLabel, posts: [] })
        months.get(monthKey).posts.push(post)
    }

    return [...years.entries()].map(([year, months]) => ({
        year,
        months: [...months.values()],
    }))
})

watch([query, selectedTag, selectedMonth], () => {
    if (props.currentPage !== 1) emit('open-page', 1)
    nextTick(updateActiveMonth)
})

watch(() => props.currentPage, () => nextTick(updateActiveMonth))

watch(groupedPosts, () => nextTick(updateActiveMonth))

watch(totalPages, (nextTotal) => {
    if (props.currentPage > nextTotal) emit('open-page', nextTotal)
})

function setMonthRef(monthKey, el) {
    if (el) {
        monthRefs.set(monthKey, el)
    } else {
        monthRefs.delete(monthKey)
    }
}

function updateActiveMonth() {
    const months = groupedPosts.value.flatMap((group) => group.months)
    const current = months.reduce((active, month) => {
        const el = monthRefs.get(month.key)
        return el && el.getBoundingClientRect().top <= 96 ? month : active
    }, months[0])
    activeMonth.value = current?.key || ''
}

function toggleTag(tag) {
    selectedTag.value = selectedTag.value === tag ? '' : tag
}

function toggleMonth(monthKey) {
    selectedMonth.value = selectedMonth.value === monthKey ? '' : monthKey
}

function withBasePath(path) {
    return `${basePath}${path}` || path
}

function pageHref(page) {
    return page > 1 ? withBasePath(`/blog/page/${page}.html`) : withBasePath('/blog.html')
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
onMounted(() => {
    updateActiveMonth()
    window.addEventListener('scroll', updateActiveMonth, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', updateActiveMonth))
</script>
