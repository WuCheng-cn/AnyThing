/*
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2022-12-20 10:30:46
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 14:26:41
 * @FilePath: \anything\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
 */
// TypeScript反射库
import 'reflect-metadata'
// 环境垫片，把es6的新特性引入到旧环境中
import 'es6-shim'

import { createApp } from 'vue'
import './assets/css'
import './style.css'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import { createPinia } from 'pinia'
// pinia数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 自定义指令插件
import { directivePlugin } from './directives'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
// pinia数据持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
app
.use(router)
.use(naive)
.use(pinia)
.use(directivePlugin)
.mount('#app')

export {app}