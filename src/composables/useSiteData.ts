import { shallowRef } from 'vue'
import type { SitePayload } from '../types/site'

const DEFAULT_API_BASE = 'http://localhost:8080'
const API_BASE = (import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE).replace(/\/$/, '')

const siteData = shallowRef<SitePayload | null>(null)
const loading = shallowRef(false)
const error = shallowRef<string | null>(null)

let pendingRequest: Promise<SitePayload> | null = null

// 统一管理站点数据的加载、缓存和错误状态，避免多个页面重复请求同一份数据。
async function loadSiteData(force = false) {
  if (pendingRequest) {
    return pendingRequest
  }

  if (siteData.value && !force) {
    return siteData.value
  }

  loading.value = true
  error.value = null

  // 缓存当前进行中的请求，确保多个页面首次挂载时共用同一条请求链。
  pendingRequest = fetch(`${API_BASE}/api/site`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`API ${response.status}`)
      }

      return (await response.json()) as SitePayload
    })
    .then((payload) => {
      siteData.value = payload
      return payload
    })
    .catch((loadError: unknown) => {
      const message = loadError instanceof Error ? loadError.message : '加载失败'
      error.value = message
      throw loadError
    })
    .finally(() => {
      pendingRequest = null
      loading.value = false
    })

  return pendingRequest
}

export function useSiteData() {
  void loadSiteData()

  return {
    data: siteData,
    isLoading: loading,
    error,
    reload: () => loadSiteData(true),
  }
}
