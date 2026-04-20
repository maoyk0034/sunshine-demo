<template>
  <div class="min-h-screen bg-surface text-on-surface">
    <!-- 顶部公共导航：统一承载品牌、主导航和页面级操作入口。 -->
    <TopNav :brand="data?.brand ?? 'Radiant Harbor'" :nav="data?.nav ?? []" />

    <!-- 主内容区域：由当前路由页面通过插槽注入。 -->
    <main>
      <slot />
    </main>

    <!-- 底部公共信息：统一展示品牌、版权和辅助链接。 -->
    <SiteFooter
      :brand="data?.footer.logoText ?? 'Radiant Harbor'"
      :copyright="data?.footer.copyright ?? '© 2024 Radiant Harbor'"
      :slogan="data?.footer.slogan ?? 'A brighter study journey'"
      :links="data?.footer.links ?? []"
    />
  </div>
</template>

<script setup lang="ts">
import TopNav from './TopNav.vue'
import SiteFooter from './SiteFooter.vue'
import { useSiteData } from '../../composables/useSiteData'

// 布局层只读取全站公共数据，不参与具体页面的业务处理。
const { data } = useSiteData()
</script>
