<template>
  <div
    class="desktop"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    @mouseup="dragend"
    @mouseleave="dragend"
    @mousemove="mouseMove($event)"
  >
    <ToolBar key="ToolBar" />
    <transition-group
      class="main"
      tag="div"
      name="drag"
    >
      <APP
        v-for="(item, index) in AppList"
        :key="item.name"
        :data="item"
        @mouseenter="dragenter($event, index)"
        @mousedown="dragstart($event, index)"
      />
    </transition-group>
    <TaskBar key="TaskBar" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { useConfig } from '@/config'

const APP = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/APP.vue'))
const ToolBar = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/ToolBar.vue'))
const TaskBar = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/Taskbar.vue'))

const { appListAll: AppList } = storeToRefs(useConfig().DesktopConfig) 

const backgroundImage = computed(() => {
  const { currentBackgroundImg, defaultBackgroundImg } = useConfig().DesktopConfig
  return currentBackgroundImg || defaultBackgroundImg
})

const dragIndex = ref<number>(0)

const cloneEl = ref<HTMLElement>()

const targetEl = ref<HTMLElement>()

const initial = ref({
  offsetX: 0,
  offsetY: 0,
  pageX: 0,
  pageY: 0,
})

let timer:any

// eslint-disable-next-line no-undef
function recordInitial (e: HTMLElementEvent<HTMLElement>) {
  const { offsetX, offsetY, pageX, pageY } = e
  initial.value = { offsetX, offsetY, pageX, pageY }
  targetEl.value = e.target as HTMLElement
}

// eslint-disable-next-line no-undef
function changePositionToMouse (e: MouseEvent, delay = 100) {
  setTimeout(() => {
    if (cloneEl.value && !cloneEl.value.classList.contains('dragging_back')) {
      const positionLeft = e.clientX - initial.value.offsetX
      const positionTop = e.clientY - initial.value.offsetY
      const cssText = `
        left: ${positionLeft}px;
        top: ${positionTop}px;
      `
      cloneEl.value.style.cssText = cssText
    }
  }, delay)
}

// eslint-disable-next-line no-undef
function dragstart (e: HTMLElementEvent<HTMLElement>, index: number) {
  timer = setTimeout(() => {
    dragIndex.value = index
    if (!cloneEl.value && e.target.classList.contains('app_item')) {
      recordInitial(e)
      cloneEl.value = e.target.cloneNode(true) as HTMLElement
      cloneEl.value.classList.add('dragging_copy')
      e.target.parentElement?.appendChild(cloneEl.value)
      changePositionToMouse(e, 0)
      e.target.classList.add('dragging')
    }
  }, 16 * 15)
}

// eslint-disable-next-line no-undef
function mouseMove (e: MouseEvent) {
  clearTimeout(timer)
  changePositionToMouse(e)
}

// eslint-disable-next-line no-undef
function dragenter (e: HTMLElementEvent<HTMLElement>, index: number) {
  e.preventDefault()
  // 避免源对象触发自身的dragenter事件
  if (dragIndex.value !== index && cloneEl.value && !cloneEl.value?.classList.contains('dragging_back')) {
    const source = AppList.value[dragIndex.value]
    AppList.value.splice(dragIndex.value, 1)
    AppList.value.splice(index, 0, source)
    // 排序变化后目标对象的索引变成源对象的索引
    dragIndex.value = index
  }
}

function dragend () {
  clearTimeout(timer)
  if (cloneEl.value) {
    cloneEl.value.classList.add('dragging_back')
    const cssText = `--animate-time: ${getAnimateTime()}ms`
    cloneEl.value.parentElement!.style.cssText = cssText
    // 将克隆元素位置移动到目标元素位置
    // clearTimeout(timer)
    if (targetEl.value) {
      const { left, top } = targetEl.value.getBoundingClientRect()
      const cssText = `
      left: ${left}px;
      top: ${top}px;
    `
      cloneEl.value.style.cssText = cssText
    }
  }
  setTimeout(() => {
    cloneEl.value?.remove()
    cloneEl.value = undefined
    if (targetEl.value?.classList.contains('dragging')) {
      targetEl.value?.classList.remove('dragging')
    }
  }, getAnimateTime())
}

function getAnimateTime () {
  // 根据克隆元素移动距离计算动画时间，最大值为500ms
  const { pageX, pageY } = initial.value
  const { left, top } = cloneEl.value?.getBoundingClientRect() || { left: 0, top: 0 }
  const distance = Math.sqrt(Math.pow(pageX - left, 2) + Math.pow(pageY - top, 2))
  return Math.min(distance / 2, 500)  
}
</script>
<style lang="less" scoped>
.desktop{
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  transition: background-image 1s;
  overflow: hidden;
  user-select: none;
}
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 50px;
  display: grid;
  grid-template-rows: repeat(auto-fill, 72px);
  grid-template-columns: repeat(auto-fill, 72px);
  grid-auto-flow: dense;
  grid-gap: 50px;
}

.drag-move {
  transition: transform .5s;
}

:deep(.dragging_back){
  transition: all var(--animate-time) ease-in-out !important;
}

:deep(.dragging_copy) {
  position: absolute;
  z-index: 9999;
  top: -9999px;
  left: -9999px;
  pointer-events: none;
}

:deep(.dragging) {
  border: 2px dashed #f2f2f2ce !important;
  border-radius: 12px !important;
  z-index: 1 !important;

  .app_icon {
    opacity: 0 !important;
  }

  .app_name {
    display: none;
  }
}
</style>
