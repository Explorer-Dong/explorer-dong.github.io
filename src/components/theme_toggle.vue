<template>
    <button class="theme-toggle" type="button" :aria-label="ariaLabel" @click="toggle">
        <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <svg class="icon-system" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'theme'

function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'system'
}

function applyTheme(preference) {
    if (preference === 'light' || preference === 'dark') {
        document.documentElement.setAttribute('data-theme', preference)
    } else {
        document.documentElement.removeAttribute('data-theme')
    }
}

function nextTheme(current) {
    if (current === 'system') return 'light'
    if (current === 'light') return 'dark'
    return 'system'
}

const theme = ref(getStoredTheme())

const ariaLabels = {
    system: '主题：跟随系统，点击切换为浅色模式',
    light: '主题：浅色模式，点击切换为深色模式',
    dark: '主题：深色模式，点击切换为跟随系统',
}

const ariaLabel = ref(ariaLabels[theme.value] || ariaLabels.system)

watchEffect(() => {
    applyTheme(theme.value)
    ariaLabel.value = ariaLabels[theme.value] || ariaLabels.system
})

function toggle() {
    theme.value = nextTheme(theme.value)
    localStorage.setItem(STORAGE_KEY, theme.value)
}
</script>
