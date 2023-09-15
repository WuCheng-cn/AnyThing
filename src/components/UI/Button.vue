<template>
  <n-button 
    :type="type"
    :loading="loading"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot name="icon">
      <n-icon>
        <FileTrayOutline />
      </n-icon>
    </slot>
    <slot />
  </n-button>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { FileTrayOutline } from '@vicons/ionicons5'

type ButtonType = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'tertiary'
type ButtonSize = 'tiny' | 'small' | 'medium' | 'large'
defineProps({
  /**
   * 按钮类型
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'primary',
  },
  /**
   * 按钮大小
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
  },
  /**
   * 是否加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})
// eslint-disable-next-line no-unused-vars
defineEmits<{(event: 'click', data: void): void;}>()
</script>
