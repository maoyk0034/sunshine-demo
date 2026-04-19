<template>
  <section class="page-shell">
    <div v-if="page" class="grid gap-8 xl:grid-cols-[1.65fr_0.82fr]">
      <div class="space-y-8">
        <article class="panel overflow-hidden p-0">
          <div class="grid gap-0 md:grid-cols-[84px_1fr]">
            <div class="flex items-start justify-center px-6 py-6">
              <img :src="page.composer.avatar" alt="当前用户头像" class="h-12 w-12 rounded-full object-cover" />
            </div>
            <div class="space-y-6 p-6">
              <div class="rounded-[18px] bg-[#f1eee8] px-5 py-6 text-[18px] text-[#a69c8b]">
                {{ page.composer.placeholder }}
              </div>
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div class="flex items-center gap-6 text-[#5f5444]">
                  <span class="material-symbols-outlined">image</span>
                  <span class="material-symbols-outlined">tag</span>
                  <span class="material-symbols-outlined">mood</span>
                </div>
                <button type="button" class="sun-button rounded-2xl px-10 py-4 text-[18px]">
                  <span class="material-symbols-outlined text-[20px]">send</span>
                  {{ page.composer.button }}
                </button>
              </div>
            </div>
          </div>
        </article>

        <div class="flex flex-wrap gap-4">
          <button
            v-for="tab in page.tabs"
            :key="tab.label"
            type="button"
            class="rounded-full px-6 py-4 text-[18px] font-medium shadow-ambient"
            :class="tab.active ? 'bg-[#ffc94a] text-[#5b4300]' : 'bg-white text-[#5e5447]'"
          >
            {{ tab.label }}
          </button>
        </div>

        <article v-for="post in page.posts" :key="post.author" class="panel p-7">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <img :src="post.avatar" :alt="post.author" class="h-12 w-12 rounded-full object-cover" />
              <div>
                <div class="font-headline text-[28px] font-bold">{{ post.author }}</div>
                <div class="text-sm text-[#7c7262]">{{ post.meta }}</div>
              </div>
            </div>
            <button type="button" class="text-[#5f5444]">
              <span class="material-symbols-outlined">more_horiz</span>
            </button>
          </div>

          <p class="mt-5 text-[19px] leading-9 text-[#443b2f]">{{ post.content }}</p>

          <div class="mt-5 flex flex-wrap gap-3">
            <span v-for="tag in post.tags" :key="tag" class="tag bg-[#fbe8d7] px-4 py-2 text-[#a45e1a]">{{ tag }}</span>
          </div>

          <div v-if="post.images?.length" class="mt-6 grid gap-4 md:grid-cols-2">
            <div v-for="image in post.images" :key="image" class="overflow-hidden rounded-[18px]">
              <img :src="image" alt="帖子内容图" class="image-cover h-56" />
            </div>
          </div>

          <div v-if="post.supportBar" class="mt-6 rounded-[18px] bg-[#fbefe2] px-6 py-5 text-[17px] text-[#8f6032]">
            {{ post.supportBar }}
          </div>

          <div class="mt-7 flex flex-wrap items-center gap-8 text-[20px] text-[#534838]">
            <div v-for="stat in post.stats" :key="stat.label" class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[24px]">{{ stat.icon }}</span>
              <span>{{ stat.label }}</span>
            </div>
            <div class="ml-auto flex items-center gap-2" v-if="post.share">
              <span class="material-symbols-outlined text-[24px]">share</span>
            </div>
          </div>
        </article>

        <div class="flex items-center justify-center gap-3 py-8 text-[20px] text-[#574d40]">
          <span class="material-symbols-outlined animate-spin [animation-duration:2.4s]">progress_activity</span>
          <span>{{ page.loadingText }}</span>
        </div>
      </div>

      <aside class="space-y-6 pt-1">
        <article class="warm-panel relative overflow-hidden p-8">
          <div class="absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full bg-white/16" />
          <div class="space-y-4">
            <div class="font-headline text-[42px] font-bold">{{ page.quoteCard.title }}</div>
            <p class="text-[20px] leading-9 text-[#6d3f0f]">“{{ page.quoteCard.content }}”</p>
          </div>
        </article>

        <article class="panel p-8">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">local_fire_department</span>
              <span class="font-headline text-[36px] font-bold">{{ page.hotTopics.title }}</span>
            </div>
            <button type="button" class="text-[18px] text-primary">{{ page.hotTopics.refresh }}</button>
          </div>
          <div class="space-y-5">
            <div v-for="topic in page.hotTopics.list" :key="topic.rank" class="space-y-1">
              <div class="text-[22px] font-semibold">
                <span :class="topic.rank <= 3 ? 'text-[#93531a]' : 'text-[#5f5444]'">{{ topic.rank }}</span>
                {{ topic.text }}
              </div>
              <div class="text-sm text-[#857b68]">{{ topic.meta }}</div>
            </div>
          </div>
        </article>

        <article class="panel p-8">
          <div class="mb-6 flex items-center gap-3">
            <span class="material-symbols-outlined text-[#0c6f88]">groups</span>
            <span class="font-headline text-[36px] font-bold">{{ page.friends.title }}</span>
          </div>
          <div class="space-y-6">
            <div v-for="friend in page.friends.list" :key="friend.name" class="flex items-center gap-4">
              <img :src="friend.avatar" :alt="friend.name" class="h-14 w-14 rounded-full object-cover" />
              <div class="min-w-0 flex-1">
                <div class="truncate text-[22px] font-semibold">{{ friend.name }}</div>
                <div class="truncate text-sm text-[#7d7261]">{{ friend.meta }}</div>
              </div>
              <button type="button" class="rounded-full bg-[#f1eee8] px-5 py-2 text-[16px] text-[#6d6255]">关注</button>
            </div>
          </div>
        </article>
      </aside>
    </div>

    <div v-else class="panel mt-10 p-10 text-center text-[#7b7263]">
      {{ error ?? '正在加载页面...' }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSiteData } from '../composables/useSiteData'

const { data, error } = useSiteData()
const page = computed(() => data.value?.community)
</script>
