<template>
  <div
    class="task_bar"
    @mouseleave="resetAllScale"
  >
    <APP
      v-for="(item) in defaultTaskAppList"
      :key="item.name"
      :data="item"
      hide-name
      class="task_app_item"
      @mousemove.prevent="handleMove"
    />
    <!-- <div class="split_line" /> -->
    <transition-group name="history_in">
      <APP
        v-for="(item) in appListInTaskList"
        :key="item.name + 'task'"
        :data="item"
        is-task-app
        hide-name
        class="task_app_item"
        @mousemove.prevent="handleMove"
      />
    </transition-group>
  </div>
</template>
<script lang="ts" setup>
import { watch, nextTick, computed } from 'vue'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { useConfig } from '@/config'
import { storeToRefs } from 'pinia'

const APP = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/APP.vue'))

const { defaultTaskAppList, appTaskList, appListInTaskList } = storeToRefs(useConfig().DesktopConfig)

const taskDomDictinary = new Map<string, HTMLElement>()

const taskNum = computed(() => {
  return appTaskList.value.length
})

watch(taskNum, () => {
  nextTick(() => {
    appTaskList.value.forEach((item) => {
      const dom = taskDomDictinary.get(item.app.name)
      if (dom) {
        item.setTaskBarDom(dom)
      }
    })
  })
})

function handleMove (e:MouseEvent) {
  const item = e.target as HTMLElement
  const next = item.nextElementSibling as HTMLElement
  const prev = item.previousElementSibling as HTMLElement

  const itemRect = item.getBoundingClientRect()
  const offsetRate = Math.abs(e.clientX - itemRect.left) / itemRect.width
  
  // resetAllScale()

  const baseScale = 0.6
  // 当前元素放大比例
  const currentScale = 1 + baseScale
  // next 放大比例
  const nextScale = 1 + baseScale * offsetRate
  // prev 放大比例
  const prevScale = 1 + baseScale * Math.abs(offsetRate - 1)

  if (item.classList.contains('task_app_item')) {
    const cssText = `width: ${60 * currentScale}px; top: ${-60 * (currentScale - 1)}px;height: ${60 * currentScale}px;`
    item.style.cssText = cssText
  }
  if (next && next.classList.contains('task_app_item')) {
    const cssText = `width: ${60 * nextScale}px; top: ${-60 * (nextScale - 1)}px;height: ${60 * nextScale}px;`
    next.style.cssText = cssText
  }
  if (prev && prev.classList.contains('task_app_item')) {
    const cssText = `width: ${60 * prevScale}px; top: ${-60 * (prevScale - 1)}px;height: ${60 * prevScale}px;`
    prev.style.cssText = cssText
  }
}

function resetAllScale () {
  const items = document.querySelectorAll('.task_app_item')
  items.forEach((item) => {
    (item as HTMLElement).style.width = '60px'
    ;(item as HTMLElement).style.height = '60px'
    ;(item as HTMLElement).style.top = '0'
  })
}

</script>
<style lang="less" scoped>
  .task_bar {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 600px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    padding: 10px 30px;
    color: #fff;
    background: rgba( 255, 255, 255, 0.4 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    animation: task_bar-enter 1s;
    transition: all 1s;
    z-index: 9999;
    .split_line{
      width: 2px;
      height: 50px;
      border-radius: 2px;
      background: rgba( 255, 255, 255, 0.3);
      margin: 0 16px;
    }
    .task_app_item{
      position: relative;
      width: 60px;
      height: 60px;
      &+.task_app_item{
        margin-left: 8px;
      }
      :deep(img){
        width: 100% !important;
      }
    }
  }
  .history_in-enter-active {
    position: relative;
    animation: history_in .5s;
  }
  .history_in-leave-active {
    position: relative;
    animation: history_in .5s reverse;
  }

@keyframes history_in {
    0% {
      width: 0;
      opacity: 0;
      overflow: hidden;
      transform: translate(50%,50%);
    }
    100% {
      width: 60px;
      opacity: 1;
      overflow: hidden;
      transform: translate(0,0);
    }
  }

  @keyframes task_bar-enter {
    0% {
      max-width: 10px;
      height: 10px;
      padding: 0;
      overflow: hidden;
      border-radius: 5px;
      background-color: #fff;
      bottom: -80px;
    }
    20% {
      max-width: 16px;
      height: 16px;
      padding: 0;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
      bottom: 30px;
    }
    30% {
      max-width: 16px;
      height: 16px;
      padding: 0;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
      bottom: 15px;
    }
    50% {
      max-width: 1px;
      padding: 0;
      overflow: hidden;
      background: rgba( 255, 255, 255, 0.7);
    }
    100% {
      max-width: 600px;
      overflow: hidden;
      border-radius: 40px;
    }
  }
</style>
