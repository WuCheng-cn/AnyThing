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
const chartStore = defineStore('chartStore', {
  persist: true,
  state: () => {
    return {
    }
  },
})
export {
  chartStore
}