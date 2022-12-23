<template>
  <div class="anything">
    <n-message-provider>
      <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
        <router-view />
      </n-config-provider>
    </n-message-provider>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.anything {
  height: 100vh;
  width: 100vw;
}
</style>
