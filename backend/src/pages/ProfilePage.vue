<template>
  <section class="page-shell">
    <div v-if="page" class="grid gap-10 xl:grid-cols-[360px_1fr]">
      <!-- 左侧个人信息区：展示头像、目标院校、连续打卡情况和功能菜单。 -->
      <aside class="space-y-8">
        <article class="panel relative overflow-hidden p-8 text-center">
          <div class="absolute left-0 top-0 h-48 w-full bg-[radial-gradient(circle_at_85%_10%,rgba(255,201,74,0.3),transparent_34%),radial-gradient(circle_at_25%_15%,rgba(152,226,253,0.2),transparent_28%)]" />
          <div class="relative">
            <div class="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-ambient">
              <img :src="page.user.avatar" :alt="page.user.name" class="image-cover" />
            </div>
            <button type="button" class="absolute right-[72px] top-[76px] flex h-11 w-11 items-center justify-center rounded-full bg-[#ffc94a] text-[#5b4300]">
              <span class="material-symbols-outlined text-[20px]">edit</span>
            </button>
            <div class="mt-8 font-headline text-[54px] font-bold">{{ page.user.name }}</div>
            <div class="mt-2 flex items-center justify-center gap-2 text-[24px] text-[#5c5141]">
              <span class="material-symbols-outlined text-[22px]">school</span>
              <span>目标：{{ page.user.target }}</span>
            </div>
            <div class="panel-soft mt-8 flex items-center justify-between rounded-[20px] px-6 py-6 text-left">
              <div>
                <div class="text-[18px] text-[#7a705f]">连续打卡</div>
                <div class="font-headline text-[42px] font-bold text-primary">{{ page.user.streak }}</div>
              </div>
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#f9e7b8] text-primary">
                <span class="material-symbols-outlined text-[30px]" style="font-variation-settings: 'FILL' 1">local_fire_department</span>
              </div>
            </div>
          </div>
        </article>

        <article class="panel p-7">
          <div class="space-y-3">
            <button
              v-for="item in page.menu"
              :key="item.label"
              type="button"
              class="flex w-full items-center justify-between rounded-[20px] px-5 py-5 text-left"
              :class="item.active ? 'bg-[#faf3df] text-primary' : 'bg-transparent text-[#4d4337]'"
            >
              <span class="flex items-center gap-4 text-[24px]">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </span>
              <span
                v-if="item.badge"
                class="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#ffd7d4] px-2 text-[16px] text-[#b84c3d]"
              >
                {{ item.badge }}
              </span>
            </button>
          </div>
        </article>
      </aside>

      <!-- 右侧主内容区：上方展示成就数据，下方展示计划列表的空状态占位。 -->
      <div class="space-y-8 pt-4">
        <section class="space-y-5">
          <div class="font-headline text-[44px] font-bold">成就看板</div>
          <div class="grid gap-6 xl:grid-cols-3">
            <article v-for="stat in page.stats" :key="stat.label" class="panel relative overflow-hidden p-8">
              <div class="flex items-center gap-4 text-[24px] text-[#5b4d39]">
                <span class="material-symbols-outlined text-[32px]" :style="{ color: stat.iconColor }">{{ stat.icon }}</span>
                <span>{{ stat.label }}</span>
              </div>
              <div class="mt-8 text-[64px] font-extrabold leading-none">{{ stat.value }}</div>
              <div class="mt-3 text-[20px] text-[#7a715f]">{{ stat.unit }}</div>
              <div class="absolute bottom-[-26px] right-[-16px] text-[150px] opacity-20" :style="{ color: stat.iconColor }">
                {{ stat.decor }}
              </div>
            </article>
          </div>
        </section>

        <section class="panel overflow-hidden">
          <div class="flex flex-wrap gap-10 border-b border-[#efe7da] px-8 pt-7">
            <button
              v-for="tab in page.tabs"
              :key="tab.label"
              type="button"
              class="relative pb-6 font-headline text-[24px] font-bold"
              :class="tab.active ? 'text-primary' : 'text-[#5f5444]'"
            >
              {{ tab.label }}
              <span
                v-if="tab.active"
                class="absolute bottom-0 left-0 h-1 w-12 rounded-full bg-[#f2b300]"
              />
            </button>
          </div>
          <div class="relative grid min-h-[680px] place-items-center overflow-hidden px-8 py-14 text-center">
            <div class="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_48%_22%,rgba(255,201,74,0.22),transparent_16%)]" />
            <div class="relative max-w-[620px] space-y-8">
              <div class="mx-auto h-[320px] w-[320px] overflow-hidden rounded-full shadow-ambient">
                <img :src="page.emptyState.image" alt="空状态插图" class="image-cover mix-blend-multiply" />
              </div>
              <div class="space-y-4">
                <div class="font-headline text-[52px] font-bold">{{ page.emptyState.title }}</div>
                <p class="text-[22px] leading-10 text-[#5e5547]">{{ page.emptyState.description }}</p>
              </div>
              <button type="button" class="sun-button rounded-[22px] px-10 py-6 text-[26px]">
                <span class="material-symbols-outlined">add</span>
                {{ page.emptyState.button }}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div v-else class="panel mt-10 p-10 text-center text-[#7b7263]">
      {{ error ?? '正在加载页面...' }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSection } from '../composables/useSiteSection'

// 个人中心页面只读取 profile 分区，和页面展示结构一一对应。
const { page, error } = useSiteSection('profile')
</script>
