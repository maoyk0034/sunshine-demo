<template>
  <section class="page-shell">
    <div v-if="page" class="space-y-12">
      <!-- 页头区域：展示规划主题、副标题，以及编辑规划、生成总结等主操作按钮。 -->
      <section class="grid gap-10 xl:grid-cols-[1.6fr_0.82fr]">
        <div class="space-y-8">
          <div class="space-y-4 pt-10">
            <div class="text-sm uppercase tracking-[0.3em] text-[#8f856f]">{{ page.label }}</div>
            <h1 class="hero-title">{{ page.title }}</h1>
            <p class="hero-subtitle">{{ page.subtitle }}</p>
          </div>
        </div>
        <div class="flex items-start justify-end gap-4 xl:pt-16">
          <button type="button" class="sun-outline rounded-2xl px-7 py-5 text-[18px]">
            <span class="material-symbols-outlined">edit_note</span>
            {{ page.actions.edit }}
          </button>
          <button type="button" class="sun-button rounded-2xl px-7 py-5 text-[18px]">
            <span class="material-symbols-outlined">auto_awesome</span>
            {{ page.actions.summary }}
          </button>
        </div>
      </section>

      <!-- 规划总览区：集中展示目标院校、目标专业、当前进度和考试倒计时。 -->
      <section class="panel grid gap-8 p-8 xl:grid-cols-[1.1fr_1.2fr]">
        <div class="grid gap-8 md:grid-cols-2">
          <div class="flex items-center gap-5">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-[#9ee4fd] text-[#0e6d86]">
              <span class="material-symbols-outlined">school</span>
            </div>
            <div>
              <div class="text-sm text-[#7e7464]">目标院校</div>
              <div class="font-headline text-[42px] font-bold">{{ page.targetSchool }}</div>
            </div>
          </div>
          <div class="flex items-center gap-5">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffc598] text-[#8a4f1b]">
              <span class="material-symbols-outlined">code</span>
            </div>
            <div>
              <div class="text-sm text-[#7e7464]">报考专业</div>
              <div class="font-headline text-[34px] font-bold">{{ page.targetMajor }}</div>
            </div>
          </div>
        </div>

        <div class="panel-soft flex flex-col justify-center gap-6 p-8">
          <div class="flex items-end justify-between">
            <div>
              <div class="text-sm text-[#7a715f]">总体进度</div>
              <div class="font-headline text-[54px] font-bold text-primary">{{ page.progress }}%</div>
            </div>
            <div class="text-[24px] text-[#584f42]">距离初试 {{ page.daysLeft }} 天</div>
          </div>
          <div class="relative h-4 rounded-full bg-[#ece7dc]">
            <div class="absolute left-0 top-0 h-full rounded-full bg-[#8d6700]" :style="{ width: `${page.progress}%` }" />
            <div
              class="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#ffc94a] shadow-ambient"
              :style="{ left: `calc(${page.progress}% - 16px)` }"
            >
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1">wb_sunny</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 规划主体区：左侧是阶段时间轴，右侧是今日核心任务和每周待办。 -->
      <section class="grid gap-8 xl:grid-cols-[1.65fr_0.8fr]">
        <div class="space-y-8">
          <div class="font-headline text-[40px] font-bold">备考时间轴</div>
          <div class="relative space-y-12 pl-8 before:absolute before:left-[9px] before:top-6 before:h-[calc(100%-48px)] before:w-[2px] before:bg-[#ece5d7]">
            <article v-for="phase in page.timeline" :key="phase.title" class="relative">
              <div
                class="absolute left-[-31px] top-6 h-5 w-5 rounded-full"
                :class="phase.status === '进行中' ? 'bg-[#ffc94a]' : 'bg-[#ece5d7]'"
              />
              <div class="panel p-8" :class="phase.status === '进行中' ? 'border-l-4 border-[#ffc94a]' : 'opacity-75'">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="font-headline text-[34px] font-bold">{{ phase.title }}</div>
                    <div class="mt-1 text-[24px] text-[#675e51]">{{ phase.period }}</div>
                  </div>
                  <span class="tag bg-[#f1ead6] px-4 py-2 text-primary">{{ phase.status }}</span>
                </div>
                <p class="mt-5 text-[18px] leading-8 text-[#665d50]">{{ phase.description }}</p>
                <div class="mt-8 space-y-3">
                  <div
                    v-for="task in phase.tasks"
                    :key="task.text"
                    class="flex items-center gap-4 rounded-[18px] border border-[#efe6d6] px-5 py-5"
                    :class="task.done ? 'bg-[#f1efe8]' : 'bg-white'"
                  >
                    <span
                      class="flex h-8 w-8 items-center justify-center rounded-full border text-sm"
                      :class="task.done ? 'border-[#8a6500] bg-[#8a6500] text-white' : 'border-[#8c7a5c] text-transparent'"
                    >
                      ✓
                    </span>
                    <span class="text-[18px]">{{ task.text }}</span>
                  </div>
                </div>
                <div v-if="phase.tags?.length" class="mt-6 flex flex-wrap gap-3">
                  <span v-for="tag in phase.tags" :key="tag" class="tag bg-[#f7f2e8] px-4 py-2 text-[#8c7d62]">{{ tag }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="space-y-6 pt-16">
          <article class="warm-panel p-8">
            <div class="space-y-4">
              <div class="font-headline text-[34px] font-bold">{{ page.todayFocus.title }}</div>
              <p class="text-[18px] leading-8 text-[#82531d]">{{ page.todayFocus.subtitle }}</p>
            </div>
            <div class="mt-8 rounded-[18px] bg-white/60 p-5">
              <div class="flex items-center gap-3 text-[#8a4f1b]">
                <span class="material-symbols-outlined">menu_book</span>
                <span class="font-semibold">{{ page.todayFocus.task }}</span>
              </div>
              <div class="mt-2 text-[16px] leading-7 text-[#885625]">{{ page.todayFocus.note }}</div>
            </div>
          </article>

          <article class="panel p-8">
            <div class="font-headline text-[34px] font-bold">{{ page.weeklyTasks.title }}</div>
            <div class="mt-7 space-y-5">
              <label v-for="task in page.weeklyTasks.list" :key="task.text" class="flex items-start gap-4">
                <span
                  class="mt-1 flex h-7 w-7 items-center justify-center rounded-md border"
                  :class="task.done ? 'border-[#8a6500] bg-[#8a6500] text-white' : 'border-[#cfc5b6] bg-white text-transparent'"
                >
                  ✓
                </span>
                <span>
                  <span class="block text-[18px]">{{ task.text }}</span>
                  <span class="mt-1 block text-sm text-[#857966]">{{ task.note }}</span>
                </span>
              </label>
            </div>
            <button type="button" class="sun-outline mt-8 w-full rounded-2xl px-6 py-4 text-[18px]">
              {{ page.weeklyTasks.button }}
            </button>
          </article>
        </div>
      </section>
    </div>

    <div v-else class="panel mt-10 p-10 text-center text-[#7b7263]">
      {{ error ?? '正在加载页面...' }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSection } from '../composables/useSiteSection'

// 备考规划页只读取 studyPlan 分区，页面数据结构更清晰。
const { page, error } = useSiteSection('studyPlan')
</script>
