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
    <div class="split_line" />
    <APP
      v-for="(item) in historyTaskAppList"
      :key="item.name"
      :data="item"
      hide-name
      class="task_app_item"
      @mousemove.prevent="handleMove"
    />
  </div>
</template>
<script lang="ts" setup>
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { useConfig } from '@/config'
import { storeToRefs } from 'pinia'

const APP = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/APP.vue'))

const { defaultTaskAppList, historyTaskAppList } = storeToRefs(useConfig().DesktopConfig)

function handleMove (e:MouseEvent) {
  const item = e.target as HTMLElement
  const next = item.nextElementSibling as HTMLElement
  const prev = item.previousElementSibling as HTMLElement

  const itemRect = item.getBoundingClientRect()
  const offsetRate = Math.abs(e.clientX - itemRect.left) / itemRect.width
  
  resetAllScale()

  const baseScale = 0.6
  // 当前元素放大比例
  const currentScale = 1 + baseScale
  // next 放大比例
  const nextScale = 1 + baseScale * offsetRate
  // prev 放大比例
  const prevScale = 1 + baseScale * Math.abs(offsetRate - 1)

  const cssText = `width: ${60 * currentScale}px; top: ${-60 * (currentScale - 1)}px;height: ${60 * currentScale}px;`
  item.style.cssText = cssText

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
    width: 600px;
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
    z-index: 1;
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

  @keyframes task_bar-enter {
    0% {
      width: 10px;
      height: 10px;
      padding: 0;
      overflow: hidden;
      border-radius: 5px;
      background-color: #fff;
      bottom: -80px;
    }
    20% {
      width: 16px;
      height: 16px;
      padding: 0;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
      bottom: 30px;
    }
    30% {
      width: 16px;
      height: 16px;
      padding: 0;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
      bottom: 15px;
    }
    50% {
      width: 1px;
      padding: 0;
      overflow: hidden;
      background: rgba( 255, 255, 255, 0.7);
    }
    100% {
      overflow: hidden;
      border-radius: 40px;
    }
  }
</style>
