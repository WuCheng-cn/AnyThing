<template>
  <div ref="AnyModelRef" :class="['any_model_mac', isFullScreen ? 'full' : '' ]">
    <div class="header">
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
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { AnyResizeControllerHelper } from '@/helper/AnyResizeControllerHelper'

const ControllerMac = AnyComponentHelper.asyncComponent(() => import('@/components/UI/ControllerMac.vue'))

const ResizeController = AnyComponentHelper.asyncComponent(() => import('@/components/UI/ResizeController.vue'))

const isFullScreen = ref(false)

const AnyModelRef = ref<HTMLElement>()

function onClose () {
  console.log('onClose')
}

function onMinimize () {
  console.log('onMinimize')
}

function onMaximize () {
  isFullScreen.value = !isFullScreen.value
  console.log('onMaximize')
}

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new AnyResizeControllerHelper(AnyModelRef.value)
})

</script>
<style lang="less" scoped>
.any_model_mac {
  position: fixed;
  top: 20vh;
  left: 20vw;
  width: calc(100vw - 2 * 20vw);
  height: calc(100vh - 2 * 20vh);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  user-select: none;
  resize: both;
  transition: all .3s;
  z-index: 9999;
  &.full {
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    border-radius: 0 !important;
    transform: none !important;
    z-index: 9999;
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
</style>
