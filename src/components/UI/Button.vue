<template>
  <n-button type="primary" @click="$emit('click')">
    <slot>Button</slot>
  </n-button>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
type ButtonType = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'tertiary'

defineProps({
  /**
   * 按钮类型
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'primary',
  },
})
// eslint-disable-next-line no-unused-vars
defineEmits<{(event: 'click', data: void): void;}>()
</script>
