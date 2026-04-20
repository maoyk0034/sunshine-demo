<template>
  <section class="page-shell">
    <div v-if="page" class="space-y-16">
      <!-- 首页首屏：承载品牌主标题、搜索入口和视觉主图，是用户进入站点后的第一屏信息。 -->
      <section class="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div class="space-y-8">
          <div class="tag bg-white text-[#7a6e56] shadow-ambient">{{ page.hero.eyebrow }}</div>
          <div class="space-y-5">
            <h1 class="hero-title max-w-[640px]">
              {{ page.hero.titleStart }}
              <span class="block bg-gradient-to-r from-[#4a3900] to-[#e7ab14] bg-clip-text text-transparent">
                {{ page.hero.titleAccent }}
              </span>
            </h1>
            <p class="hero-subtitle">{{ page.hero.description }}</p>
          </div>

          <div class="panel flex flex-col gap-4 p-4 md:flex-row md:items-center md:rounded-full md:p-3">
            <div class="flex flex-1 items-center gap-3 rounded-full bg-[#f9f7f2] px-5 py-4">
              <span class="material-symbols-outlined text-[#8e846f]">search</span>
              <span class="text-[15px] text-[#ada595]">{{ page.hero.searchPlaceholder }}</span>
            </div>
            <button type="button" class="sun-button h-14 rounded-full px-8 text-[15px]">
              {{ page.hero.searchButton }}
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-sm text-[#8e846f]">
            <span class="font-semibold text-[#63594a]">热推：</span>
            <span v-for="hint in page.hero.searchHints" :key="hint">{{ hint }}</span>
          </div>
        </div>

        <div class="relative">
          <div class="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_20%_90%,rgba(152,226,253,0.24),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(255,201,74,0.35),transparent_32%)]" />
          <div class="relative overflow-hidden rounded-[36px] p-6">
            <div class="overflow-hidden rounded-[32px] shadow-ambient">
              <img :src="page.hero.image" alt="考研主页主视觉" class="image-cover h-[540px]" />
            </div>
          </div>
          <div class="panel absolute bottom-0 left-0 flex items-center gap-4 px-6 py-5 md:left-[-16px]">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffd8b6] text-primary">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">wb_sunny</span>
            </div>
            <div>
              <div class="text-sm text-[#8d846f]">{{ page.hero.statLabel }}</div>
              <div class="font-headline text-[28px] font-extrabold">{{ page.hero.statValue }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能捷径区：左侧突出倒计时，右侧承接核心功能入口，帮助用户快速进入主要场景。 -->
      <section class="grid gap-4 lg:grid-cols-[1.1fr_1.7fr]">
        <div class="warm-panel relative overflow-hidden p-7">
          <div class="absolute right-[-25px] top-[-10px] h-32 w-32 rounded-full bg-white/15" />
          <div class="space-y-10">
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-[#724300]">
                <span class="material-symbols-outlined text-[20px]">calendar_clock</span>
                <span class="font-semibold">{{ page.countdown.title }}</span>
              </div>
              <p class="text-sm text-[#946029]">{{ page.countdown.description }}</p>
            </div>
            <div class="flex items-end gap-3">
              <span class="font-headline text-[84px] font-extrabold leading-none text-[#814300]">
                {{ page.countdown.value }}
              </span>
              <span class="mb-3 text-[22px] text-[#814300]">{{ page.countdown.unit }}</span>
            </div>
            <button type="button" class="sun-outline w-full rounded-2xl px-5 py-4 text-[15px]">
              {{ page.countdown.button }}
            </button>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="action in page.quickActions"
            :key="action.title"
            class="panel flex min-h-[170px] flex-col justify-between p-6"
            :class="action.accent === 'wide' ? 'md:col-span-2' : ''"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl" :class="action.iconBg">
              <span class="material-symbols-outlined text-[22px]">{{ action.icon }}</span>
            </div>
            <div class="space-y-2">
              <div class="font-headline text-[22px] font-bold">{{ action.title }}</div>
              <p class="text-sm leading-7 text-[#7d7668]">{{ action.subtitle }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 推荐院校区：以卡片形式展示热门学校信息，突出选校参考价值。 -->
      <section class="space-y-7">
        <div class="flex items-end justify-between gap-4">
          <div class="space-y-2">
            <h2 class="section-heading">{{ page.schoolSection.title }}</h2>
            <p class="muted-label">{{ page.schoolSection.subtitle }}</p>
          </div>
          <button type="button" class="text-[15px] font-semibold text-primary">
            {{ page.schoolSection.action }} →
          </button>
        </div>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <article v-for="school in page.recommendedSchools" :key="school.name" class="panel overflow-hidden">
            <div class="h-48 overflow-hidden">
              <img :src="school.image" :alt="school.name" class="image-cover transition duration-500 hover:scale-105" />
            </div>
            <div class="space-y-4 p-5">
              <div class="space-y-3">
                <div class="font-headline text-[24px] font-bold">{{ school.name }}</div>
                <div class="flex flex-wrap gap-2 text-[12px]">
                  <span class="tag bg-[#f4f0ea] text-[#887b64]">{{ school.score }}</span>
                  <span class="tag bg-[#dff5fe] text-[#1c7993]">{{ school.tag }}</span>
                </div>
              </div>
              <p class="line-clamp-3 text-sm leading-7 text-[#776d5d]">{{ school.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 上岸故事区：通过真实感较强的故事卡片增强信任感与情绪激励。 -->
      <section class="space-y-8 pb-10 text-center">
        <div class="space-y-3">
          <h2 class="section-heading">{{ page.storySection.title }}</h2>
          <p class="muted-label mx-auto max-w-3xl">{{ page.storySection.subtitle }}</p>
        </div>
        <div class="grid gap-6 lg:grid-cols-3">
          <article
            v-for="story in page.stories"
            :key="story.name"
            class="panel flex flex-col justify-between p-8 text-left"
            :class="story.featured ? 'bg-[#ffc94a]' : ''"
          >
            <div class="space-y-6">
              <img :src="story.avatar" :alt="story.name" class="h-16 w-16 rounded-full border-4 border-white object-cover" />
              <div class="space-y-4">
                <div class="text-[18px] tracking-[0.3em] text-[#88511e]">★★★★★</div>
                <p class="text-[15px] leading-8 text-[#5f5444]">{{ story.quote }}</p>
              </div>
            </div>
            <div class="mt-8">
              <div class="font-headline text-[22px] font-bold">{{ story.name }}</div>
              <div class="mt-1 text-sm text-[#7c715f]">{{ story.school }}</div>
            </div>
          </article>
        </div>
        <button type="button" class="sun-outline rounded-full px-8 py-4 text-[15px]">
          {{ page.storySection.button }}
        </button>
      </section>
    </div>

    <div v-else class="panel mt-10 p-10 text-center text-[#7b7263]">
      {{ error ?? '正在加载页面...' }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSection } from '../composables/useSiteSection'

// 首页只读取全站数据中的 home 分区，避免页面脚本直接感知整个站点结构。
const { page, error } = useSiteSection('home')
</script>
