<template>
  <n-layout
    class="anything"
    content-style="display: flex;flex-direction: column;"
  > 
    <n-layout-header :inverted="false" bordered>
      <n-space justify="end" style="padding:10px">
        <ThemeSettingVue ref="ThemeSettingRef" />
      </n-space>
    </n-layout-header>
    <n-layout-content style="flex: 1;">
      <router-view />
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import ThemeSettingVue from './themeSetting.vue'
</script>
<style lang="less" scoped>
.anything {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
