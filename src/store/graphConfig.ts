import { defineStore } from "pinia"

/**
 * # 画布相关配置
 */
export const graph = defineStore('graph', {
  persist: true,
  state: () => {
    return {
      devicePixelRatio: window.devicePixelRatio,
      expectWidth:1920,
      expectHeight:1080,
    }
  },
})