<template>
  <n-config-provider :theme="useConfig().AppConfig.theme">
    <n-space vertical>
      <n-layout style="height: 100vh;" content-style="display: flex;flex-direction: column;">
        <n-layout-header :inverted="false" bordered>
          <n-space justify="end" style="padding:10px">
            <ThemeSettingVue ref="ThemeSettingRef" />
          </n-space>
        </n-layout-header>
        <n-layout class="any-main">
          <router-view />
        </n-layout>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>
<script setup lang="ts">
import ThemeSettingVue from './themeSetting.vue'
import { useConfig } from '@/config'

</script>
<style lang="less" scoped>
  .any-main{
    flex: 1;
  }
</style>
