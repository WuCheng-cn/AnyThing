import { defineStore } from "pinia"
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { darkTheme } from 'naive-ui'

/**
 * # app相关配置
 */
export const appConfig = defineStore('appConfig', {
  // persist: true,
  state: () => {
    return {
      /**
       * 主题
       * @description 该属性会自动切换naive-ui的主题
       */
      theme: darkTheme,
      /**
       * 静态资源地址
       */
      staticUrl: 'xx',
      /**
       * 上传/读取文件大小限制
       */
      maxFileSize: 1024 * 1024 * 10
    }
  },
  actions: {
    /**
     * 设置主题
     * @param theme 主题
     * @returns
     * @description 该方法会自动切换naive-ui的主题
     */
    setTheme(theme: BuiltInGlobalTheme) {      
      this.theme = theme
    }  
  }
})