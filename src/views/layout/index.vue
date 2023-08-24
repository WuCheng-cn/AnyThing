<template>
  <n-config-provider :theme="theme">
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
    <ThemeSettingVue ref="ThemeSettingRef" />
  </n-config-provider>
</template>
<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { Component, h, ref, computed } from 'vue'
import {
  Pencil as EditIcon,
  SettingsSharp as SettingIcon,
} from '@vicons/ionicons5'
import ThemeSettingVue from './themeSetting.vue'
import { useConfig } from '@/store'

const ThemeSettingRef = ref()
const theme = computed(() => {
  console.log(useConfig.app().theme)
  
  return useConfig.app().theme
})

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
