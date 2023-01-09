/*
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-09 10:02:35
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 11:07:07
 * @FilePath: \anything\src\store\config.ts
 * @Description: config
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
 */
import { defineStore } from 'pinia'

/**
 * # 表单相关配置
 */
const form = defineStore('form', {
  persist: true,
  state: () => {
    return {
    }
  },
})
/**
 * # 画布相关配置
 */
const graph = defineStore('graph', {
  persist: true,
  state: () => {
    return {
      devicePixelRatio: window.devicePixelRatio,
      expectWidth:1920,
      expectHeight:1080,
    }
  },
})
export const useConfig ={
  form,
  graph,
}