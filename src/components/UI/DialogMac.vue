<template>
  <div ref="PositionProviderRef" class="position_provider">
    <transition name="any_model" appear>
      <div v-if="!isClose" ref="AnyModelRef" :class="['any_model_mac']">
        <div
          class="header" 
          @mousedown="startDrag"
        >
          <ControllerMac
            :on-close="onClose" 
            :on-minimize="onMinimize"
            :on-maximize="onMaximize"
          />
          <div class="title">
            弹窗标题
          </div>
        </div>
        <div class="main">
          <slot />
        </div>
        <div class="footer">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, PropType } from 'vue'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { AnyResizeControllerHelper } from '@/helper/AnyResizeControllerHelper'
import { useStore } from '@/store'

const ControllerMac = AnyComponentHelper.asyncComponent(() => import('@/components/UI/ControllerMac.vue'))

const props = defineProps({
  /**
   * # 关闭前的回调
   */
  beforClose: {
    type: Function as PropType<()=> Promise<boolean>>,
    default: undefined,
  },
  /**
   * # 对话框挂载时的回调
   */
  onMounted: {
    type: Function as PropType<()=> void>,
    default: undefined,
  },
})

const emits = defineEmits(['on-after-leave'])

const { clickedPosition } = useStore().clickPositionStore 

const PositionProviderRef = ref<HTMLElement>()

const AnyModelRef = ref<HTMLElement>()

const isFullScreen = ref(false)

const isClose = ref(false)

const initData = {
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  transtion: '',
}

async function onClose () {
  if (props.beforClose) {
    const res = await props.beforClose()
    if (!res) return
  }
  isClose.value = true
  setTimeout(() => {
    emits('on-after-leave')
  }, 1000)
}

function onMinimize () {
  console.log('onMinimize')
}

function onMaximize () {
  isFullScreen.value = !isFullScreen.value
  let cssText = ''
  if (isFullScreen.value) {
    cssText = `
     width: 100vw;
     height: 100vh;
     top: 0;
     left: 0;
     border-radius: 0 ;
     transform: none ;
     z-index: 9999;
   `
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  AnyModelRef.value!.style.cssText = cssText
}

function mousemove (e: MouseEvent) {
  let { clientX, clientY } = e
  if (clientX < 0) {
    clientX = 0
  }
  if (clientY < 0) {
    clientY = 0
  }
  if (clientX > window.innerWidth) {
    clientX = window.innerWidth
  }
  if (clientY > window.innerHeight) {
    clientY = window.innerHeight
  }
  const x = clientX - initData.offsetX
  const y = clientY - initData.offsetY
  const cssText = `
    width: ${initData.width}px;
    height: ${initData.height}px;
    top: ${y}px;
    left: ${x}px;
    transition: unset;
  `
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  AnyModelRef.value!.style.cssText = cssText
}

function startDrag (e: MouseEvent) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { width, height } = AnyModelRef.value!.getBoundingClientRect()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { left, top } = AnyModelRef.value!.getBoundingClientRect() 
  const { clientX, clientY } = e
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  initData.transtion = AnyModelRef.value!.style.transition
  initData.width = width
  initData.height = height
  initData.offsetX = clientX - left
  initData.offsetY = clientY - top
  
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', stopDrag)
}

function stopDrag () {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  AnyModelRef.value!.style.transition = initData.transtion
  document.removeEventListener('mousemove', mousemove)
  document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
  if (props.onMounted) {
    props.onMounted()
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new AnyResizeControllerHelper(AnyModelRef.value)
  if (clickedPosition) {
    PositionProviderRef.value?.style.setProperty('--startX', `${clickedPosition.x}px`)
    PositionProviderRef.value?.style.setProperty('--startY', `${clickedPosition.y}px`)
  }
})

</script>
<style lang="less" scoped>
.position_provider{
  --startX: 0;
  --startY: 0;
}
.any_model_mac {
  --top:12vh;
  --left:20vw;
  position: fixed;
  top: var(--top);
  left: var(--left);
  width: calc(100vw - 2 * var(--left));
  height: calc(100vh - 2 * var(--top));
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  user-select: none;
  transition: all .3s;
  z-index: 999;

  .header {
    cursor: grab;
    height: 40px;
    background: #f5f5f5;
    border-radius: 10px 10px 0 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 10px;

    &:active {
      cursor: grabbing;
    }

    .title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      text-align: center;
    }
  }

  .main {
    flex: 1;
    padding: 10px;
    overflow: auto;
  }
}
.any_model-enter-active {
  animation: any_model-enter 1s;
}

.any_model-leave-active {
  animation: any_model-enter reverse .5s;
}

@keyframes any_model-enter {
    0% {
      position: fixed;
      width: 10px;
      height: 10px;
      padding: 0;
      overflow: hidden;
      background-color: #fff;
      top: calc(var(--startY) - 5px);
      left: calc(var(--startX) - 5px);
      pointer-events: none;
      opacity: 0;
    }
    50% {
      position: fixed;
      width: 2px;
      padding: 0;
      overflow: hidden;
      left: calc(var(--startX -5px));
      pointer-events: none;
      opacity: .8;
    }
  }
</style>
