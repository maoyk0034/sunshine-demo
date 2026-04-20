<template>
  <header class="sticky top-0 z-50 border-b border-[#efe8da] bg-white/80 backdrop-blur-xl">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
      <!-- 品牌入口：点击后返回首页。 -->
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[30px] text-[#f2a300]" style="font-variation-settings: 'FILL' 1">
          wb_sunny
        </span>
        <span class="font-headline text-[34px] font-extrabold italic tracking-tight text-[#b45400]">
          {{ brand }}
        </span>
      </RouterLink>

      <!-- 主导航区域：根据后端返回的导航配置生成页面跳转入口。 -->
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

      <!-- 工具操作区：根据当前路由决定是否显示搜索、通知等按钮。 -->
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

type HeaderControls = {
  showSearch: boolean
  showBell: boolean
}

const HEADER_CONTROLS: Record<string, HeaderControls> = {
  '/': { showSearch: true, showBell: false },
  '/schools': { showSearch: false, showBell: false },
  '/study-plan': { showSearch: true, showBell: false },
  '/learning': { showSearch: true, showBell: false },
  '/community': { showSearch: true, showBell: false },
  '/resources': { showSearch: false, showBell: true },
  '/profile': { showSearch: true, showBell: true },
}

defineProps<{
  brand: string
  nav: NavItem[]
}>()

const route = useRoute()

// 将“页面路径 -> 顶部操作按钮显示规则”集中管理，方便后续新增页面时统一维护。
const meta = computed(() => HEADER_CONTROLS[route.path] ?? { showSearch: true, showBell: false })
</script>
