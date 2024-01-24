<template>
  <div ref="AppRef" class="app_item" @click="handleClick">
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
import { PropType, ref } from 'vue'
import { InApp } from '@/interface/desktop/InApp'
import { useConfig } from '@/config'
import { storeToRefs } from 'pinia'

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
const { appIconSize, historyTaskAppList } = storeToRefs(useConfig().DesktopConfig)

const AppRef = ref<HTMLElement>()

function handleClick () {
  useConfig().DesktopConfig.currentApp = props.data
  useConfig().DesktopConfig.currentAppRef = AppRef.value
  // 将点击的app放到历史任务栏中，如果已经存在则不添加
  if (!historyTaskAppList.value.find((item) => item.name === props.data.name)) {
    historyTaskAppList.value.push(props.data)
  }
  if (props.data.handler) {
    props.data.handler()
  }
}

</script>
<style lang="less" scoped>
.app_item {
  cursor: pointer;
  box-sizing: border-box;
  z-index: 2;
  border: 2px dashed transparent;
  border-radius: 12px;
  animation: app_click 0s;
  &:hover {
    animation-duration: 1s;
  }
  &:active{
    animation: none;
  }
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  transition: all 0.3s;
  pointer-events: none;
  .app_name {
    opacity: 1;
    transition: all 0.3s;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
  }
}

@keyframes app_click {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    // transform: scale(0.9);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0), 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0), 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
}
</style>
