import { defineStore } from "pinia"
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { GlobalThemeOverrides, darkTheme } from 'naive-ui'
import { EThemeType } from "@/enum/EThemeType"

/**
 * # app相关配置
 */
export const AppConfig = defineStore('appConfig', {
  persist: true,
  state: () => {
    return {
      /**
       * 主题
       */
      themeType: EThemeType.DARK,
      /**
       * 静态资源地址
       */
      staticUrl: 'xx',
      /**
       * 上传/读取文件大小限制
       */
      maxFileSize: 1024 * 1024 * 10,
      /**
       * 最大值
       */
      max: 999999999999999,
      /**
       * 最小值
       */
      min: -999999999999999,
      /**
       * 最大长度
       */
      maxLength: 16,
      /**
       * 最小长度
       */
      minLength: 0,      
    }
  },
  getters: {
    /**
     * 获取主题
     * @returns
     */
    theme():BuiltInGlobalTheme | undefined {
      return this.themeType === EThemeType.DARK ? darkTheme : undefined
    },
  },
  actions: {
    /**
     * 设置主题类型
     * @param themeType 主题类型
     * @returns
     * @description 该方法会自动切换naive-ui的主题
     */
    setThemeType(themeType: EThemeType) {
      this.themeType = themeType
    }
  }
})