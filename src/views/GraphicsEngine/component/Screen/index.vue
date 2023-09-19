<template>
  <div class="any-screen" :style="screenStyle" />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useConfig } from '@/config'

const GraphConfig = useConfig().GraphConfig

const screenStyle = computed(() => {
  return {
    width: GraphConfig.expectWidth + 'px',
    height: GraphConfig.expectHeight + 'px',
  }
})
</script>
<style lang="less" scoped>
.any-screen{
  transition: all 0.3s var(--cubic-bezier-ease-in-out);
  background-color: #232324;
  border-radius: 16px;
  opacity: 0.8;
}
</style>
