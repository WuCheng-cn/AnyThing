<template>
  <div
    ref="appRef"
    class="app_item"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <div v-if="currentAppTaskList.length && isTaskApp" class="task">
      <div class="task_list">
        <div
          v-for="(item) in currentAppTaskList"
          :key="item.id"
          class="task_item"
          @click.stop="handleTaskClick(item)"
        >
          <div class="header">
            <div class="name">{{ item.app.name }}-{{ item.id }}</div>
            <!-- <div class="contorller contorller-close" @click.stop="handleCloseTask(item)">
              <n-icon class="icon" :component="X" />
            </div> -->
          </div>
          <div class="preview">
            <div :ref="(el) => setTaskRef(el as HTMLElement, item)" class="preview_main" />
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <n-image
        class="app_icon"
        preview-disabled
        :width="size || appIconSize"
        :src="data.icon"
      />
      <div v-if="!hideName" class="app_name">{{ data.name }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, computed, onMounted } from 'vue'
import { useConfig } from '@/config'
import { storeToRefs } from 'pinia'
import { AppEntity } from '@/entity/desktop/AppEntity'
import { AppTaskEntity } from '@/entity/desktop/AppTaskEntity'
import { DesktopManageHelper } from '../hooks/DesktopManageHelper'
import { X } from '@vicons/tabler'

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

const appRef = ref<HTMLElement>()

const taskViewRefs = ref<WeakMap<AppTaskEntity, HTMLElement >>(new WeakMap())

const { appIconSize, appList, appTaskList } = storeToRefs(useConfig().DesktopConfig)

const currentAppTaskList = computed(() => {
  return appTaskList.value.filter((item) => item.app.name === props.data.name) as AppTaskEntity[]
})

function handleClick () {
  if (props.data.handler && !props.isTaskApp) {
    props.data.handler(props.data)
  } else if (props.isTaskApp && currentAppTaskList.value.length === 1) {
    handleTaskClick(currentAppTaskList.value[0])
  } else if (props.isTaskApp && props.data.handler && !currentAppTaskList.value.length) {
    props.data.handler(props.data, () => {
      DesktopManageHelper.setTaskBarDomByApp(appRef.value!, props.data)
    })
  }
}

function handleTaskClick (item: AppTaskEntity) {
  if (item.isMinimize) {
    item.modelDom?.classList.remove('any_model_minimize')
  } else {
    item.modelDom?.classList.add('any_model_minimize')
  }
  item.isMinimize = !item.isMinimize
}

function setTaskRef (el: HTMLElement, item: AppTaskEntity) {
  if (el) {
    taskViewRefs.value.set(item, el)
    // item.setTaskViewDom(el)
    // // 把ModelDom复制一个到el上
    // const modelDom = item.modelDom
    // if (modelDom) {      
    //   const cloneDom = modelDom.cloneNode(true) as HTMLElement
    //   const scaleRateX = 196 / 1920 
    //   const scaleRateY = 100 / 1080 
    //   const cssText = `
    //     position: relative;
    //     overflow: hidden;
    //     width: 1920px;
    //     height: 1080px;
    //     left: unset;
    //     top: unset;
    //     right: unset;
    //     bottom: unset; 
    //     pointer-events: none;
    //     transform: scale(${scaleRateX}, ${scaleRateY});
    //     transform-origin: left top;  
    //     opacity: 1;
    //     transition:unset;
    //   `
    //   cloneDom.style.cssText = cssText
    //   el.appendChild(cloneDom)
    // }
  }
}

function handleMouseEnter () {
  if (props.isTaskApp) {
    const taskList = appTaskList.value.filter((item) => item.app.name === props.data.name) as AppTaskEntity[]
    taskList.forEach((item) => {
      DesktopManageHelper.refreshTaskView(item, taskViewRefs.value.get(item) as HTMLElement)
    })
  }
}

function handleCloseTask (item: AppTaskEntity) {
  DesktopManageHelper.removeTask(item)
}

onMounted(() => {
  if (props.isTaskApp) {
    DesktopManageHelper.setTaskBarDomByApp(appRef.value!, props.data)
  } else {
    const app = appList.value.find((item) => item.name === props.data.name)
    if (app) {
      app.dom = appRef.value
    }
  }
})

</script>
<style lang="less" scoped>
.app_item {
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  border: 2px dashed transparent;
  border-radius: 12px;
  z-index: 2;

  &:hover {
    .task {
      opacity: 1;
      pointer-events: unset;
    }
  }

  .task {
    pointer-events: none;
    opacity: 0;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -90px);
    transition: all 0.3s;
    padding: 10px;
    z-index: 9999;

    .task_list {
      display: flex;
      gap: 10px;
    }

    .task_item {
      cursor: pointer;
      width: 216px;
      height: 150px;
      background: #fff;
      color: #121212;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 10px;

      .preview {
        position: relative;
        flex: 1;
        width: 100%;
        height: 0;

        .preview_main {
          height: 100%;
          width: 100%;
        }
      }

      .header {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .icon {
          display: none;
          font-weight: bold;
        }

        &:hover {
          .icon {
            display: block;
          }
        }

        .name {
          flex: 1;
          height: 20px;
          width: 0;
          font-size: 12px;
          font-weight: 500;
          color: #333;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .contorller {
          cursor: pointer;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fd5858;

          &:active {
            opacity: .5;
          }

        }
      }
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
