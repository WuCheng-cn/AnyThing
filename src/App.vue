<template>
  <div class="anything">
    <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useClickPosition } from 'vooks'
import { useStore } from '@/store'
const clickedPositionRef = useClickPosition()

watch(clickedPositionRef, (value) => {
  useStore().clickPositionStore.setClickedPosition(value)
}, {
  immediate: true,
  deep: true,
})
</script>
<style scoped>
.anything {
  height: 100vh;
  width: 100vw;
}
</style>
