<template>
  <n-config-provider 
    :theme="useConfig().AppConfig.theme"
    :theme-overrides="useConfig().AppConfig.themeOverrides"
  >
    <n-message-provider>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useClickPosition } from 'vooks'
import { useStore } from '@/store'
import { useConfig } from './config'
const clickedPositionRef = useClickPosition()

watch(clickedPositionRef, (value) => {
  useStore().clickPositionStore.setClickedPosition(value)
}, {
  immediate: true,
  deep: true,
})
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}
</style>
