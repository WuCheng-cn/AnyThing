<template>
  <div class="app_item" @click="handleClick">
    <div class="main">
      <n-image
        class="app_icon"
        lazy
        preview-disabled
        :width="size || appIconSize"
        :src="data.icon"
      />
      <div v-if="!hideName" class="app_name">{{ data.name }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { InApp } from '@/interface/desktop/InApp'
import { useConfig } from '@/config'

const props = defineProps({
  data: {
    type: Object as PropType<InApp>,
    required: true,
  },
  /**
   * # 是否隐藏名称
   */
  hideName: {
    type: Boolean,
    default: false,
  },
  /**
   * # 图标大小
   * 如不传入则使用全局默认大小
   */
  size: {
    type: Number,
    default: undefined,
  },
})

const { appIconSize } = useConfig().DesktopConfig

function handleClick () {
  if (props.data.handler) {
    props.data.handler()
  }
}

</script>
<style lang="less" scoped>
.app_item {
  z-index: 2;
  border: 2px dashed transparent;
  cursor: pointer;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  transition: all 0.3s;
  pointer-events: none;

  &[draggable] {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  .app_name {
    opacity: 1;
    transition: all 0.3s;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
