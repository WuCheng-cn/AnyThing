<template>
  <n-drawer v-model:show="showOuterRef" :width="502">
    <n-drawer-content title="主题设置">
      <n-switch
        v-model:value="isLightTheme"
        :round="false" 
      >
        <template #checked>
          浅色
        </template>
        <template #unchecked>
          深色
        </template>
      </n-switch>
    </n-drawer-content>
  </n-drawer>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import { useConfig } from '@/store/index'
  
const showOuterRef = ref(false)
const isLightTheme = ref(false)
function init () {
  console.log('init', useConfig.app().theme.name)
  if (useConfig.app().theme.name === 'light') {
    isLightTheme.value = true
  } else {
    isLightTheme.value = false
  }
}
init()
/**
 * 显示抽屉
 */
const doShowOuter = () => {
  showOuterRef.value = true
}

/**
 * 监听主题变化
 */
watch(isLightTheme, (value:boolean) => {
  if (value) {
    useConfig.app().setTheme(lightTheme)
  } else {
    useConfig.app().setTheme(darkTheme)
  }
},
)

defineExpose({ 
  doShowOuter,
})
</script>
