<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout>
      <span>内容</span>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { h, ref, Component } from 'vue'
import { NIcon } from 'naive-ui'
import { MdImages } from '@vicons/ionicons4'
import type { MenuOption } from 'naive-ui'

const activeKey = ref<string | null>(null)
const collapsed = ref(false)

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '壁纸',
    key: 'hear-the-wind-sing',
    icon: renderIcon(MdImages),
  },
  {
    label: '壁纸',
    key: 'hear-the-wind-sing',
    icon: renderIcon(MdImages),
  },

]
 
</script>
