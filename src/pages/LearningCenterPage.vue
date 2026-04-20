<template>
  <section class="page-shell">
    <div v-if="page" class="space-y-10">
      <!-- 学习中心头部：展示当前学习状态、打卡氛围和专注计时器入口。 -->
      <section class="grid gap-8 xl:grid-cols-[1.55fr_0.75fr]">
        <article class="panel relative overflow-hidden p-9">
          <div class="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_60%_10%,rgba(255,201,74,0.35),transparent_36%)]" />
          <div class="relative flex h-full flex-col justify-between gap-10">
            <div class="space-y-7">
              <h1 class="hero-title">{{ page.hero.title }}</h1>
              <div class="flex items-center gap-4 text-[20px] text-primary">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">local_fire_department</span>
                <span>{{ page.hero.subtitle }}</span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-6">
              <button type="button" class="panel flex items-center gap-4 rounded-[28px] px-8 py-6">
                <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1">check_circle</span>
                <span class="font-headline text-[28px] font-bold">{{ page.hero.button }}</span>
              </button>
              <div class="flex items-center">
                <img
                  v-for="(buddy, index) in page.hero.buddies"
                  :key="buddy"
                  :src="buddy"
                  alt="学习伙伴"
                  class="h-14 w-14 rounded-full border-4 border-white object-cover"
                  :style="{ marginLeft: index === 0 ? '0' : '-14px' }"
                />
                <div class="ml-[-14px] flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#ece7de] text-[22px] font-bold text-[#5f5441]">
                  +12
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="panel-soft flex flex-col items-center justify-between p-10 text-center">
          <div class="space-y-2">
            <div class="font-headline text-[38px] font-bold">{{ page.focus.title }}</div>
            <p class="text-[20px] text-[#6f6657]">{{ page.focus.subtitle }}</p>
          </div>
          <div class="font-headline text-[82px] font-extrabold">{{ page.focus.time }}</div>
          <div class="flex items-center gap-6">
            <button type="button" class="icon-button h-16 w-16 bg-white">
              <span class="material-symbols-outlined text-primary">stop</span>
            </button>
            <button type="button" class="flex h-20 w-20 items-center justify-center rounded-full bg-[#8a6500] text-white shadow-ambient">
              <span class="material-symbols-outlined text-[34px]" style="font-variation-settings: 'FILL' 1">play_arrow</span>
            </button>
          </div>
        </article>
      </section>

      <!-- 学习数据看板：通过热力图、科目占比和时长柱状图展示学习投入情况。 -->
      <section class="grid gap-6 xl:grid-cols-[1.3fr_0.62fr_0.62fr]">
        <article class="panel p-8">
          <div class="mb-8 flex items-start justify-between">
            <div>
              <div class="font-headline text-[40px] font-bold">{{ page.heatmap.title }}</div>
              <div class="mt-2 text-[20px] text-[#776d5e]">{{ page.heatmap.subtitle }}</div>
            </div>
            <button type="button" class="rounded-2xl bg-[#f0ece5] px-6 py-4 text-[18px]">{{ page.heatmap.month }}</button>
          </div>
          <div class="grid grid-cols-7 gap-4">
            <div v-for="day in page.heatmap.days" :key="day" class="pb-2 text-center text-[18px] text-[#806f56]">{{ day }}</div>
            <div
              v-for="(cell, index) in page.heatmap.grid"
              :key="index"
              class="aspect-square rounded-[14px]"
              :style="{ background: cell }"
            />
          </div>
        </article>

        <article class="panel p-8">
          <div class="font-headline text-[40px] font-bold">{{ page.subjects.title }}</div>
          <div class="mt-8 flex items-center justify-center">
            <div class="relative flex h-48 w-48 items-center justify-center rounded-full bg-[radial-gradient(circle,#ffffff_0%,#f6f3ee_62%,#efebe5_100%)]">
              <div class="h-28 w-28 rounded-full bg-white shadow-inner" />
              <div class="absolute inset-0 rounded-full border-[18px] border-[#f6f3ee]" />
              <div class="absolute text-center">
                <div class="font-headline text-[54px] font-extrabold">{{ page.subjects.total }}</div>
                <div class="text-[18px] text-[#817462]">总科目</div>
              </div>
            </div>
          </div>
          <div class="mt-8 space-y-4">
            <div v-for="item in page.subjects.list" :key="item.name" class="flex items-center justify-between text-[20px]">
              <div class="flex items-center gap-3">
                <span class="h-4 w-4 rounded-full" :style="{ background: item.color }" />
                <span>{{ item.name }}</span>
              </div>
              <span class="font-semibold">{{ item.percent }}</span>
            </div>
          </div>
        </article>

        <article class="panel p-8">
          <div class="space-y-2">
            <div class="font-headline text-[40px] font-bold">{{ page.dailyHours.title }}</div>
            <div class="text-[22px] font-semibold text-primary">{{ page.dailyHours.average }}</div>
          </div>
          <div class="mt-10 flex h-[320px] items-end justify-between gap-3">
            <div v-for="bar in page.dailyHours.bars" :key="bar.day" class="flex flex-1 flex-col items-center gap-3">
              <div class="w-full rounded-t-[10px]" :style="{ height: bar.height, background: bar.color }" />
              <div class="text-[18px] text-[#827561]">{{ bar.day }}</div>
            </div>
          </div>
        </article>
      </section>

      <!-- 周报入口区：承接复盘和总结场景，引导用户查看阶段性结果。 -->
      <article class="panel-soft flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-6">
          <div class="flex h-[72px] w-[72px] items-center justify-center rounded-[22px] bg-white text-primary shadow-ambient">
            <span class="material-symbols-outlined text-[30px]">auto_graph</span>
          </div>
          <div>
            <div class="font-headline text-[42px] font-bold">{{ page.report.title }}</div>
            <div class="mt-2 text-[20px] text-[#6e6658]">{{ page.report.subtitle }}</div>
          </div>
        </div>
        <button type="button" class="panel rounded-[22px] px-8 py-5 font-headline text-[26px] font-bold text-primary">
          {{ page.report.button }} →
        </button>
      </article>
    </div>

    <div v-else class="panel mt-10 p-10 text-center text-[#7b7263]">
      {{ error ?? '正在加载页面...' }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSection } from '../composables/useSiteSection'

// 学习中心页面只依赖 learning 分区数据，和其他页面的数据边界保持一致。
const { page, error } = useSiteSection('learning')
</script>
