<template>
  <n-button 
    :size="size"
    :type="type"
    :focusable="false"
    :loading="loading"
    :disabled="disabled"
    :secondary="level === EButtonLevel.SECONDARY"
    :tertiary="level === EButtonLevel.TERTIARY"
    :quaternary="level === EButtonLevel.QUATERNARY"
    @click="$emit('click')"
  >
    <slot name="icon">
      <n-icon :size="iconSize">
        <component :is="icon" />
      </n-icon>
    </slot>
    <slot />
  </n-button>
</template>
<script lang="ts" setup>
import { PropType, DefineComponent, computed } from 'vue'
import { FileTrayOutline } from '@vicons/ionicons5'
import { EButtonLevel } from '@/enum/EButtonLevel'

type ButtonType = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'tertiary' | 'default'
type ButtonSize = 'tiny' | 'small' | 'medium' | 'large'
const porps = defineProps({
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
  /**
   * 图标
   */
  icon: {
    type: Object as PropType<DefineComponent<object, object, any>>,
    default: () => FileTrayOutline,
  },
  /**
   * 按钮级别
   */
  level: {
    type: String as PropType<EButtonLevel>,
    default: EButtonLevel.PRIMARY,
  },
})
// eslint-disable-next-line no-unused-vars
defineEmits<{(event: 'click', data: void): void;}>()

/**
 * 图标大小
 * @description 根据按钮大小计算图标大小（默认单位px）
 */
const iconSize = computed(() => {
  switch (porps.size) {
    case 'tiny':
      return '12'
    case 'small':
      return '16'
    case 'medium':
      return '20'
    case 'large':
      return '24'
    default:
      return '20'
  }
})
</script>
