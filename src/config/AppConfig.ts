import { defineStore } from "pinia"
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { darkTheme } from 'naive-ui'

/**
 * # app相关配置
 */
export const AppConfig = defineStore('appConfig', {
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