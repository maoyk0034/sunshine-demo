<template>
  <section class="page-shell">
    <div v-if="page" class="grid gap-10 xl:grid-cols-[320px_1fr]">
      <!-- 左侧分类区：展示资料分类树和引导性文案，帮助用户快速定位资源方向。 -->
      <aside class="space-y-8">
        <article class="panel p-8">
          <div class="mb-7 font-headline text-[44px] font-bold">资料分类</div>
          <div class="space-y-6">
            <div v-for="group in page.categories" :key="group.name" class="space-y-4">
              <button
                type="button"
                class="flex w-full items-center gap-4 rounded-[20px] px-6 py-4 text-left text-[20px] font-semibold"
                :class="group.active ? 'bg-[#ffc94a] text-[#5b4300]' : 'bg-transparent text-[#4f4638]'"
              >
                <span class="material-symbols-outlined">{{ group.icon }}</span>
                {{ group.name }}
              </button>
              <div v-if="group.children?.length" class="ml-8 space-y-4 border-l border-[#e8dfd0] pl-6 text-[18px] text-[#5f5444]">
                <div v-for="child in group.children" :key="child">{{ child }}</div>
              </div>
            </div>
          </div>
        </article>

        <article class="warm-panel relative overflow-hidden p-8">
          <div class="absolute bottom-[-12px] right-[-6px] text-[90px] text-white/35">⛵</div>
          <p class="font-headline text-[28px] leading-[1.8] text-[#7a4718]">
            “{{ page.quote }}”
          </p>
        </article>
      </aside>

      <!-- 右侧资源区：包含搜索框、热门标签和资料卡片列表，是资源浏览主体。 -->
      <div class="space-y-8">
        <article class="panel p-7">
          <div class="rounded-[22px] bg-[#efebe4] px-6 py-6 text-[20px] text-[#8e846f]">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-[34px]">search</span>
              <span>{{ page.searchPlaceholder }}</span>
            </div>
          </div>
          <div class="mt-6 flex flex-wrap items-center gap-4">
            <span class="text-[20px] text-[#6d6456]">热门标签：</span>
            <button
              v-for="tag in page.hotTags"
              :key="tag"
              type="button"
              class="rounded-full bg-[#efebe4] px-5 py-3 text-[18px] text-[#5f5444]"
            >
              {{ tag }}
            </button>
          </div>
        </article>

        <div class="grid gap-6 xl:grid-cols-3">
          <article v-for="card in page.cards" :key="card.title" class="panel overflow-hidden">
            <div class="relative h-[230px] overflow-hidden">
              <img :src="card.image" :alt="card.title" class="image-cover" />
              <span class="absolute left-4 top-4 rounded-[12px] bg-white/90 px-4 py-2 text-[14px] font-semibold text-primary">
                {{ card.badge }}
              </span>
            </div>
            <div class="space-y-5 p-6">
              <div>
                <div class="font-headline text-[30px] font-bold leading-tight">{{ card.title }}</div>
                <p class="mt-4 text-[17px] leading-8 text-[#675e50]">{{ card.description }}</p>
              </div>
              <div class="border-t border-[#efe7da] pt-5">
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#9fe4fd] text-[#165f79]">{{ card.authorBadge }}</div>
                    <span class="text-[18px] text-[#5e5444]">{{ card.author }}</span>
                  </div>
                  <div class="flex items-center gap-5 text-[18px] text-[#4d4337]">
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[22px]">thumb_up</span>{{ card.likes }}
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[22px]">bookmark</span>{{ card.bookmarks }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- 分页占位区：当前用于表现翻页结构，后续可接入真实分页或无限滚动。 -->
        <div class="flex justify-center gap-3 pt-6">
          <button type="button" class="icon-button"><span class="material-symbols-outlined">chevron_left</span></button>
          <button
            v-for="item in page.pagination"
            :key="item"
            type="button"
            class="flex h-14 min-w-14 items-center justify-center rounded-2xl px-4 text-[24px] font-semibold"
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

// 资料页只消费 resources 分区数据，避免与其他页面数据耦合。
const { page, error } = useSiteSection('resources')
</script>
