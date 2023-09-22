<template>
  <n-config-provider 
    :theme="useConfig().AppConfig.theme"
  >
    <n-message-provider>
      <router-view />
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
<style scoped>

</style>
