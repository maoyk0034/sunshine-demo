<template>
  <!-- 应用外层骨架：所有路由页面都会包裹在统一布局中，复用导航与页脚。 -->
  <AppShell>
    <RouterView />
  </AppShell>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppShell from './components/layout/AppShell.vue'
</script>
