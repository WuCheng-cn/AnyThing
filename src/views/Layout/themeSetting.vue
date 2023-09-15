<template>
  <AButton 
    :icon="AppConfig.theme.name === 'light' ? Sunny : Moon"
    :level="EButtonLevel.QUATERNARY"  
    @click="handleToggleTheme()"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import { useConfig } from '@/config'
import { AButton } from '@/components/UI'
import { EButtonLevel } from '@/enum/EButtonLevel'
import { Moon, Sunny } from '@vicons/ionicons5'
/**
 * 切换明暗主题
 */
const AppConfig = ref(useConfig().AppConfig)
function handleToggleTheme () {
  if (AppConfig.value.theme.name === 'light') {
    AppConfig.value.setTheme(darkTheme)
  } else {
    AppConfig.value.setTheme(lightTheme)
  }
}

</script>
