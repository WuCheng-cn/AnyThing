<template>
  <ToolBarIconContain>
    <n-icon :component="batteryIcon" size="24" />
  </ToolBarIconContain>
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { BatteryCharging } from '@vicons/ionicons5'
import { getBatteryIcon } from '../component/BatteryIcon'

const ToolBarIconContain = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/ToolBarIconContain.vue'))

const batteryIcon = shallowRef(getBatteryIcon(1))

function init () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (navigator.getBattery) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigator.getBattery().then((battery) => {
      console.log(battery)
      const { charging, level } = battery
      setBatteryIcon(charging, level)
      battery.addEventListener('chargingchange', () => {
        console.log('chargingchange', battery.charging)
        setBatteryIcon(battery.charging, battery.level)
      })
      battery.addEventListener('levelchange', () => {
        console.log('levelchange', battery.level)
        setBatteryIcon(battery.charging, battery.level)
      })
    })
  }
}

function setBatteryIcon (charging: boolean, level: number) {
  if (charging) {
    batteryIcon.value = BatteryCharging
  } else {
    batteryIcon.value = getIconByLevel(level)
  }
}

function getIconByLevel (level: number) {
  return getBatteryIcon(level)
}

init()
</script>
<style lang="less" scoped></style>
