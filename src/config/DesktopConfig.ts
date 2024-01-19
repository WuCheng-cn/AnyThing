import { EAppIconSize } from "@/enum/EAppIconSize"
import { defineStore } from "pinia"

/**
 * # 画布相关配置
 */
export const DesktopConfig = defineStore('desktopConfig', {
  persist: true,
  state: () => {
    return {
      appIconSize: EAppIconSize.NORMAL,
    }
  },
})