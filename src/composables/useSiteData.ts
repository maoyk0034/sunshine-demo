import { shallowRef } from 'vue'
import type { SitePayload } from '../types/site'

const siteData = shallowRef<SitePayload | null>(null)
const loading = shallowRef(false)
const error = shallowRef<string | null>(null)

async function loadSiteData() {
  if (siteData.value || loading.value) {
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE ?? 'http://localhost:8080'}/api/site`)

    if (!response.ok) {
      throw new Error(`API ${response.status}`)
    }

    siteData.value = (await response.json()) as SitePayload
  } catch (loadError) {
    error.value = loadError instanceof Error ? loadError.message : '加载失败'
  } finally {
    loading.value = false
  }
}

export function useSiteData() {
  void loadSiteData()

  return {
    data: siteData,
    isLoading: loading,
    error,
    reload: loadSiteData,
  }
}
