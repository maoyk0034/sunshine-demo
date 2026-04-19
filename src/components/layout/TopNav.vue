<template>
  <header class="sticky top-0 z-50 border-b border-[#efe8da] bg-white/80 backdrop-blur-xl">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[30px] text-[#f2a300]" style="font-variation-settings: 'FILL' 1">
          wb_sunny
        </span>
        <span class="font-headline text-[34px] font-extrabold italic tracking-tight text-[#b45400]">
          {{ brand }}
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-8 font-headline text-[17px] font-medium text-on-surface md:flex">
        <RouterLink
          v-for="item in nav"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: route.path === item.path }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-4">
        <button
          v-if="meta.showSearch"
          type="button"
          class="icon-button"
          aria-label="搜索"
        >
          <span class="material-symbols-outlined">search</span>
        </button>
        <button
          v-if="meta.showBell"
          type="button"
          class="icon-button"
          aria-label="通知"
        >
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <RouterLink
          to="/profile"
          class="profile-chip"
          :class="{ 'profile-chip-active': route.path === '/profile' }"
        >
          <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1">
            account_circle
          </span>
          <span>个人中心</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { NavItem } from '../../types/site'

defineProps<{
  brand: string
  nav: NavItem[]
}>()

const route = useRoute()

const meta = computed(() => {
  const map: Record<string, { showSearch: boolean; showBell: boolean }> = {
    '/': { showSearch: true, showBell: false },
    '/schools': { showSearch: false, showBell: false },
    '/study-plan': { showSearch: true, showBell: false },
    '/learning': { showSearch: true, showBell: false },
    '/community': { showSearch: true, showBell: false },
    '/resources': { showSearch: false, showBell: true },
    '/profile': { showSearch: true, showBell: true },
  }

  return map[route.path] ?? { showSearch: true, showBell: false }
})
</script>
