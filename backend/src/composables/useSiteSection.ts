import { computed } from 'vue'
import { useSiteData } from './useSiteData'
import type { SitePayload } from '../types/site'

type SiteSectionKey = Exclude<keyof SitePayload, 'brand' | 'tagline' | 'nav' | 'footer'>

// 从全站数据中提取当前页面所需的数据分区，并保留明确的 TypeScript 类型。
export function useSiteSection<K extends SiteSectionKey>(section: K) {
  const state = useSiteData()

  return {
    ...state,
    // 统一各页面访问分区数据的方式，减少重复的 computed 逻辑。
    page: computed(() => state.data.value?.[section] ?? null),
  }
}
