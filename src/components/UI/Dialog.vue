<template>
  <n-config-provider :theme="theme">
    <n-modal 
      v-model:show="showModal"
      :on-after-leave="onAfterLeave"
    >
      <n-card
        style="width: 600px"
        title="模态框"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          <slot name="header-extra">
            噢！
          </slot>
        </template>
        <slot>
          内容
        </slot>
        <template #footer>
          <slot name="footer">
            尾部
          </slot>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useConfig } from '@/config'
import { useStore } from '@/store'

defineProps({
  onConfirm: {
    type: Function,
    default: () => () => {
      console.log('onConfirm')
    },
  },
  param: {
    type: Object,
    default: () => ({}),
  },
})
const theme = computed(() => {
  return useConfig().AppConfig.theme
})
const emits = defineEmits(['on-after-leave'])

const showModal = ref(false)

/**
 * 模态框关闭后的回调
 */
function onAfterLeave () {  
  emits('on-after-leave')
}

/**
 * 模拟上次点击，以保证 n-modal 从鼠标位置出发的动画正常生效
 */
function virtualClick () {
  const mousePosition = useStore().clickPositionStore.clickedPosition 
  // 在屏幕对应的位置上创建一个隐藏元素，点击该元素并阻止事件传递
  if (!mousePosition) return
  const virtualElement = document.createElement('div')
  virtualElement.style.cssText = `
    position: fixed;
    top: ${mousePosition.y}px;
    left: ${mousePosition.x}px;
    width: 1px;
    height: 1px;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
  `
  document.body.appendChild(virtualElement)
  virtualElement.click()
  virtualElement.remove()
}
onMounted(() => {
  virtualClick()
  showModal.value = true
})
</script>
