/*
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2022-12-20 10:30:46
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 11:01:46
 * @FilePath: \anything\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
 */
import { createApp } from 'vue'
import './assets/css'
import './style.css'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
// pinia数据持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

createApp(App)
.use(router)
.use(naive)
.use(pinia)
.mount('#app')
