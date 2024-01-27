<template>
  <div ref="PositionProviderRef" class="position_provider">
    <transition name="any_model" appear>
      <div
        v-if="!isClose"
        ref="AnyModelRef"
        :class="['any_model_mac']"
        @click="handleModelClick"
      >
        <div class="header" @mousedown="startDrag">
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
import { ref, onMounted, PropType, nextTick } from 'vue'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { AnyResizeControllerHelper } from '@/helper/AnyResizeControllerHelper'
import { useStore } from '@/store'
import { InInitializeConfig } from '@/interface/desktop/InInitializeConfig'
import { DesktopManageHelper } from '@/views/Desktop/hooks/DesktopManageHelper'

const ControllerMac = AnyComponentHelper.asyncComponent(() => import('@/components/UI/ControllerMac.vue'))

const props = defineProps({
  /**
   * # 对话框挂载时的回调
   */ 
  onModelMounted: {
    type: Function as PropType<(modelDom: HTMLElement) => Promise<InInitializeConfig>>,
    default: undefined,
  },
  /**
   * # 关闭前的回调
   */
  beforClose: {
    type: Function as PropType<() => Promise<boolean>>,
    default: undefined,
  },
  /**
   * # 最小化前的回调
   */
  beforMinimize: {
    type: Function as PropType<() => Promise<void>>,
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

const minimizeTo = {
  x: 0,
  y: 0,
}

function handleModelClick () {
  DesktopManageHelper.setHighestModel(AnyModelRef.value as HTMLElement)
}

async function onClose () {
  if (props.beforClose) {
    const res = await props.beforClose()
    if (!res) return
  }
  if (isFullScreen.value) {
    const cssText = `
    width: 100vw ;
    height: 100vh ;
    left: 0 ;
    top: 0 ;
    bottom: 0 ;
    border-radius: 0 ;
    z-index: 9999 !important;
  `
    AnyModelRef.value!.style.cssText = cssText
    AnyModelRef.value!.classList.remove('any_model_full_screen')
  }
  isClose.value = true
  setTimeout(() => {
    emits('on-after-leave')
  }, 1000)
}

async function onMinimize () {
  if (props.beforMinimize) {
    props.beforMinimize()
  }
  AnyModelRef.value!.classList.add('any_model_minimize')
}

function setCssProperty () {
  if (clickedPosition) {
    PositionProviderRef.value?.style.setProperty('--startX', `${clickedPosition.x}px`)
    PositionProviderRef.value?.style.setProperty('--startY', `${clickedPosition.y}px`)
  }
  nextTick(async () => {
    const scaleRateX = 216 / 1920
    const scaleRateY = 150 / 1080
    PositionProviderRef.value?.style.setProperty('--scaleX', `${scaleRateX}`)
    PositionProviderRef.value?.style.setProperty('--scaleY', `${scaleRateY}`)
    PositionProviderRef.value?.style.setProperty('--minimizeToX', `${minimizeTo.x}px`)
    PositionProviderRef.value?.style.setProperty('--minimizeToY', `${minimizeTo.y}px`)
  })
}

function onMaximize () {
  isFullScreen.value = !isFullScreen.value
  if (isFullScreen.value) {
    AnyModelRef.value!.classList.add('any_model_full_screen')
  } else {
    AnyModelRef.value!.classList.remove('any_model_full_screen')
  }
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
  if (isFullScreen.value) return
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

onMounted(async () => {
  if (props.onModelMounted) {
    const { minimizeToX, minimizeToY } = await props.onModelMounted(AnyModelRef.value!)
    minimizeTo.x = minimizeToX
    minimizeTo.y = minimizeToY 
  }
  setCssProperty()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new AnyResizeControllerHelper(AnyModelRef.value)
})

</script>
<style lang="less" scoped>
.position_provider {
  --startX: 0px;
  --startY: 0px;
  --minimizeToX: 0px;
  --minimizeToY: 0px;
  --scaleX: 1;
  --scaleY: 1;
  width: 100%;
  height: 100%;
}

.any_model_mac {
  --top: 12vh;
  --left: 20vw;
  position: fixed;
  top: var(--top);
  left: var(--left);
  bottom: 0;
  width: calc(100vw - 2 * var(--left));
  height: calc(100vh - 2 * var(--top));
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  user-select: none;
  transition: all .5s;
  transform: scale(1);
  z-index: 999;

  &.any_model_minimize {
    padding: 0 !important;
    overflow: hidden !important;
    left: var(--minimizeToX) !important;
    bottom: calc(100vh - var(--minimizeToY)) !important;
    pointer-events: none !important;
    transform: scale(var(--scaleX), var(--scaleY)) !important;
    transform-origin: left bottom !important;
    opacity: 0 !important;
  }

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

.any_model_full_screen {
  width: 100vw !important;
  height: 100vh !important;
  left: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  border-radius: 0 !important;
  z-index: 99999 !important;
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
  }

  30% {
    position: fixed;
    width: 3px;
    padding: 0;
    overflow: hidden;
    left: calc(var(--startX -5px));
    pointer-events: none;
  }
}
</style>
