<!--
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2022-12-23 13:27:35
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-06 17:12:48
 * @FilePath: \anything\src\views\Layout\index.vue
 * @Description: layout层
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
-->
<template>
  <n-config-provider :theme="isDarkTheme">
    <n-space vertical>
      <n-layout style="height: 100vh;" content-style="display: flex;flex-direction: column;">
        <n-layout-header :inverted="false" bordered>
          <n-space justify="end" style="padding:10px">
            <n-dropdown :options="options" :on-select="handleSelect">
              <n-icon size="20">
                <SettingIcon />
              </n-icon>
            </n-dropdown>
          </n-space>
        </n-layout-header>
        <n-layout class="any-main">
          <router-view />
        </n-layout>
      </n-layout>
    </n-space>
    <ThemeSettingVue ref="ThemeSettingRef" v-model:theme="theme" />
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme, useMessage, NIcon } from 'naive-ui'
import { Component, h, ref, computed } from 'vue'
import {
  Pencil as EditIcon,
  SettingsSharp as SettingIcon,
} from '@vicons/ionicons5'
import ThemeSettingVue from './themeSetting.vue'

const theme = ref(false)
const isDarkTheme = computed(() => {
  return theme.value ? undefined : darkTheme
})
const ThemeSettingRef = ref()
const message = useMessage()
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}
const options = ref([
  {
    label: '主题设置',
    key: 'theme',
    icon: renderIcon(EditIcon),
  },
])

function handleSelect (key: string | number) {
  switch (key) {
    case 'theme':
      ThemeSettingRef.value.doShowOuter()
      break

    default:
      break
  }
}
</script>
<style lang="less" scoped>
  .any-main{
    flex: 1;
  }
</style>
