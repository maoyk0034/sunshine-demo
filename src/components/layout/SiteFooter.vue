<template>
  <footer class="mt-20 bg-[#f2f1ed]">
    <div class="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 text-[#9b978f] md:flex-row md:items-end md:justify-between">
      <div class="space-y-2">
        <div class="font-headline text-[18px] font-extrabold text-[#9d9a92]">{{ brand }}</div>
        <div class="text-sm">{{ copyright }}</div>
      </div>
      <div class="space-y-6 text-center md:text-right">
        <div class="font-headline text-[44px] font-black italic text-[#b7b2a9]/50">{{ brand }}</div>
        <div class="flex flex-wrap justify-center gap-8 text-sm md:justify-end">
          <span v-for="link in links" :key="link">{{ link }}</span>
        </div>
        <div class="text-sm">© 2024 {{ brand }} - {{ slogan }}</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  brand: string
  copyright: string
  slogan: string
  links: string[]
}>()
</script>
