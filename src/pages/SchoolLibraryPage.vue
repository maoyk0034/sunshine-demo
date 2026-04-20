<template>
  <section class="page-shell">
    <div v-if="page" class="grid gap-10 xl:grid-cols-[320px_1fr]">
      <!-- 左侧筛选区：提供地区、院校层级等筛选条件，用于收窄学校范围。 -->
      <aside class="panel h-fit p-8">
        <div class="mb-10 flex items-center gap-3">
          <span class="material-symbols-outlined text-[28px] text-primary">tune</span>
          <h2 class="font-headline text-[34px] font-bold">筛选条件</h2>
        </div>

        <div class="space-y-10">
          <div>
            <div class="mb-5 font-headline text-[24px] font-bold">所在地区</div>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="region in page.filters.regions"
                :key="region.label"
                type="button"
                class="tag px-5 py-3 text-[18px]"
                :class="region.active ? 'bg-[#ffc94a] text-[#5b4300]' : 'bg-[#efebe4] text-[#5e5446]'"
              >
                {{ region.label }}
              </button>
            </div>
          </div>

          <div>
            <div class="mb-5 font-headline text-[24px] font-bold">院校层次</div>
            <div class="space-y-5 text-[18px]">
              <label v-for="level in page.filters.levels" :key="level.label" class="flex items-center gap-4">
                <span
                  class="flex h-7 w-7 items-center justify-center rounded-md border"
                  :class="level.active ? 'border-[#8a6500] bg-[#8a6500] text-white' : 'border-[#d4cab9] bg-white text-transparent'"
                >
                  ✓
                </span>
                <span>{{ level.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      <!-- 右侧主内容区：包含搜索框、排序入口和学校列表，是页面的核心浏览区域。 -->
      <div class="space-y-8">
        <div class="panel flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-1 items-center gap-3 rounded-[22px] bg-[#f1eee8] px-5 py-5">
            <span class="material-symbols-outlined text-[32px] text-[#8c836e]">search</span>
            <span class="text-[18px] text-[#b0a895]">{{ page.searchPlaceholder }}</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="sort in page.sorts"
              :key="sort"
              type="button"
              class="rounded-2xl bg-[#efebe4] px-6 py-4 text-[18px] font-medium text-[#574d3f]"
            >
              {{ sort }}
            </button>
          </div>
        </div>

        <article v-for="school in page.list" :key="school.name" class="panel flex flex-col gap-6 p-8 md:flex-row md:items-start">
          <div class="h-[140px] w-[140px] overflow-hidden rounded-[20px] bg-[#0e2f42] shadow-ambient">
            <img :src="school.image" :alt="school.name" class="image-cover" />
          </div>
          <div class="flex-1 space-y-5">
            <div class="flex items-start justify-between gap-4">
              <div class="font-headline text-[40px] font-bold">{{ school.name }}</div>
              <button type="button" class="text-[#8a7b63]">
                <span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1">favorite</span>
              </button>
            </div>
            <div class="flex flex-wrap gap-3 text-[15px]">
              <span
                v-for="label in school.labels"
                :key="label.text"
                class="tag px-4 py-2"
                :class="label.tone === 'blue' ? 'bg-[#9de3fb] text-[#0c6c86]' : 'bg-[#efebe4] text-[#7d7564]'"
              >
                {{ label.text }}
              </span>
            </div>
            <div class="flex items-center gap-3 text-[18px] text-[#5a5143]">
              <span class="material-symbols-outlined text-[22px] text-[#6f5732]">school</span>
              <span>优势专业: {{ school.majors.join('、') }}</span>
            </div>
          </div>
        </article>

        <!-- 分页占位区：当前以静态形式展示翻页入口，后续可替换为真实分页逻辑。 -->
        <div class="flex justify-center gap-3 pt-8">
          <button type="button" class="icon-button"><span class="material-symbols-outlined">chevron_left</span></button>
          <button
            v-for="item in page.pagination"
            :key="item"
            type="button"
            class="flex h-14 w-14 items-center justify-center rounded-2xl text-[24px] font-semibold"
            :class="item === '1' ? 'bg-[#ffc94a] text-[#5b4300]' : 'bg-white shadow-ambient'"
          >
            {{ item }}
          </button>
          <button type="button" class="icon-button"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </div>
    </div>

    <div v-else class="panel mt-10 p-10 text-center text-[#7b7263]">
      {{ error ?? '正在加载页面...' }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSection } from '../composables/useSiteSection'

// 院校库页面只消费 schools 分区数据，使页面职责保持单一。
const { page, error } = useSiteSection('schools')
</script>
