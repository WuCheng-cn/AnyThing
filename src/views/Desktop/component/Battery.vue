<template>
  <ToolBarIconContain>
    <n-icon :component="BatteryHalf" size="24" />
  </ToolBarIconContain>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { BatteryHalf } from '@vicons/ionicons5'

const ToolBarIconContain = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/ToolBarIconContain.vue'))


function init() {
  // @ts-ignore
  if (navigator.getBattery) {
    // @ts-ignore
    navigator.getBattery().then((battery) => {
      console.log(battery)
      battery.addEventListener('chargingchange', () => {
        console.log('chargingchange', battery.charging)
      })
      battery.addEventListener('levelchange', () => {
        console.log('levelchange', battery.level)
      })
    })
  }
}

</script>
<style lang="less" scoped></style>
