<template>
  <div class="min-h-screen bg-surface text-on-surface">
    <TopNav :brand="data?.brand ?? '上岸晒太阳'" :nav="data?.nav ?? []" />
    <main>
      <slot />
    </main>
    <SiteFooter
      :brand="data?.footer.logoText ?? '上岸晒太阳'"
      :copyright="data?.footer.copyright ?? '© 2024 上岸晒太阳 - 陪你走过考研每一公里'"
      :slogan="data?.footer.slogan ?? '你的考研治愈港湾'"
      :links="data?.footer.links ?? []"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TopNav from './TopNav.vue'
import SiteFooter from './SiteFooter.vue'
import { useSiteData } from '../../composables/useSiteData'

const { data } = useSiteData()
const footer = computed(() => data.value?.footer)
</script>
