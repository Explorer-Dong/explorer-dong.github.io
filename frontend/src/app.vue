<template>
    <ThemeToggle />
    <main>
        <header>
            <a class="site-title" href="#about" @click.prevent="goTo('#about')">Vincent's Homepage</a>
            <nav class="nav-bar">
                <a v-for="item in navItems" :key="item.hash"
                    :class="['nav-item', { active: currentPage === item.hash }]" :href="item.hash"
                    @click.prevent="goTo(item.hash)">
                    {{ item.label }}
                </a>
            </nav>
        </header>

        <section v-if="currentPage === '#about'" class="markdown-body" v-html="aboutHtml"></section>

        <section v-else-if="currentPage === '#domains'" class="sites">
            <h2>{{ domainsTitle }}</h2>
            <div class="card-list">
                <SiteCard v-for="site in sites" :key="site.url" :url="site.url" :title="site.title" :desc="site.desc"
                    :tags="site.tags" :favicon-override="site.faviconOverride" />
            </div>
        </section>


        <footer>
            <p>&copy; 2026 Vincent</p>
            <div class="footer-links">
                <a href="https://stats.uptimerobot.com/uDFPc6P9Xc">Status</a>
                <span class="separator">&middot;</span>
                <a href="https://github.com/Explorer-Dong/explorer-dong.github.io">GitHub</a>
                <span class="separator">&middot;</span>
                <a href="mailto:explorer-dong@foxmail.com">Email</a>
            </div>
        </footer>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './components/theme_toggle.vue'
import SiteCard from './components/site_card.vue'
import { frontmatter } from '../content/domains.md'
import { html as aboutHtml } from '../content/about.md'

const navItems = [
    { hash: '#about', label: 'About' },
    { hash: '#domains', label: 'Domains' },
]

const sites = frontmatter.sites || []

function getPage() {
    const hash = window.location.hash
    return navItems.some((item) => item.hash === hash) ? hash : '#about'
}

const currentPage = ref(getPage())

function onHashChange() {
    currentPage.value = getPage()
}

function goTo(hash) {
    window.location.hash = hash
}

onMounted(() => window.addEventListener('hashchange', onHashChange))
onUnmounted(() => window.removeEventListener('hashchange', onHashChange))
</script>
