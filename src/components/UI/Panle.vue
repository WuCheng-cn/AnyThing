<!--
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-06 16:26:55
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-06 17:33:20
 * @FilePath: \anything\src\components\UI\Panle.vue
 * @Description: 面板组件，用于整体布局，默认插槽为中部主体区域；另带头部、底部插槽。 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
-->
<template>
  <n-layout has-sider class="any-panle" :sider-placement="siderPlacement">
    <n-layout-sider
      v-if="!hideSlider&&!hideLeftSlider"
      collapse-mode="transform"
      show-trigger="bar"
      content-style="padding: 24px;"
      :width="300"
      :collapsed-width="0"
      :on-after-leave="resize"
      :on-after-enter="resize"
    >
      <slot name="slider-left" />
    </n-layout-sider>
    <n-layout content-style="display: flex;flex-direction: column;">
      <n-layout-content style="flex: 1;">
        <slot />
      </n-layout-content>
    </n-layout>
    <n-layout-sider  
      v-if="!hideSlider&&showRightSlider"
      collapse-mode="transform"
      show-trigger="bar"
      content-style="padding: 24px;"
      :width="400"
      :collapsed-width="0"
      :on-after-leave="resize"
      :on-after-enter="resize"
    >
      <slot name="slider-right" />
    </n-layout-sider>
  </n-layout>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * # 是否隐藏全部侧边栏
   */  
  hideSlider: {
    type: Boolean,
    default: false,
  },
  /**
   * # 是否显示右侧侧边栏
   */
  showRightSlider: {
    type: Boolean,
    default: false,
  },
  /**
   * # 是否隐藏左侧侧边栏
   */
  hideLeftSlider: {
    type: Boolean,
    default: false,
  },
})
const emitFn = defineEmits(['resize'])

const siderPlacement = computed(() => {
  if (props.hideSlider) {
    return undefined
  }
  if (props.hideLeftSlider) {
    return 'right'
  }
  if (!props.showRightSlider) {
    return 'left'
  }
  return 'left'
})

const resize = () => {
  emitFn('resize')
}
</script>
<style lang="less" scoped>
  .any-panle{
    flex: 1;
    width: 100%;
    height: 100%;
  }
</style>
