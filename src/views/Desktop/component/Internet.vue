<template>
  <ToolBarIconContain>
    <n-icon :component="Icon" size="20" />
  </ToolBarIconContain>
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { AccessPoint, AccessPointOff } from '@vicons/tabler'

const ToolBarIconContain = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/ToolBarIconContain.vue'))

const Icon = shallowRef(AccessPoint)

function init () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (navigator.onLine) {
    Icon.value = AccessPoint
  } else {
    Icon.value = AccessPointOff
  }
  window.addEventListener('online', () => {
    Icon.value = AccessPoint
  })
  window.addEventListener('offline', () => {
    Icon.value = AccessPointOff
  })
}

init()
</script>
<style lang="less" scoped></style>
