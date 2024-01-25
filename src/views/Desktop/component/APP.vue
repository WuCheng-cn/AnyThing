<template>
  <div class="app_item" @click="handleClick">
    <div v-if="currentAppTaskList.length && isTaskApp" class="task">
      <div class="task_list">
        <div
          v-for="(item,index) in currentAppTaskList" 
          :key="item.app.name"
          class="task_item"
          @click="handleTaskClick(item)"
        >
          {{ item.app.name + index }}
        </div>
      </div>
    </div>
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
import { PropType, ref, computed } from 'vue'
import { useConfig } from '@/config'
import { storeToRefs } from 'pinia'
import { AppEntity } from '@/entity/desktop/AppEntity'
import { AppTaskEntity } from '@/entity/desktop/AppTaskEntity'

const props = defineProps({
  data: {
    type: Object as PropType<AppEntity>,
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
  /**
   * # 是否是任务栏的应用
   */
  isTaskApp: {
    type: Boolean,
    default: false,
  },
})
const { appIconSize } = storeToRefs(useConfig().DesktopConfig)

const currentAppTaskList = computed(() => {
  const { appTaskList } = useConfig().DesktopConfig
  return appTaskList.filter((item) => item.app.name === props.data.name)
})

function handleClick () {
  if (props.data.handler && !props.isTaskApp) {
    props.data.handler(props.data)
  }
}

function handleTaskClick (item: AppTaskEntity) {
  if (item.app && item.app.handler) {
    item.app.handler(item)
  }
}

</script>
<style lang="less" scoped>
.app_item {
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  border: 2px dashed transparent;
  border-radius: 12px;
  &:hover{
    .task{
      display: block;
    }
  }
  .task{
    display: none;
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, 0);
    transition: all 0.3s;
    padding: 10px;
    z-index: 9999;
    .task_list{
      display: flex;
      gap: 10px;
    }
    .task_item{
      width: 100px;
      height: 100px;
      background: #fff;
      color: #121212;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  // animation: app_click 0s;
  // &:hover {
  //   animation-duration: 1s;
  // }
  // &:active{
  //   animation: none;
  // }
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
