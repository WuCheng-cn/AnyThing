<template>
  <div
    ref="loadingRef" 
    class="loading"
    @contextmenu.prevent
    @transitionend="handleAnimationend"
  >
    <div
      class="progress" 
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  /**
   * 是否加载完成
   */
  isLoaded: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const emits = defineEmits<{(event:'animationend', data:void):void}>()

const loadingRef = ref<HTMLElement>()

const percentage = ref(0)

function handleAnimationend () {
  if (props.isLoaded) {
    emits('animationend')
  }
}

function checkIsLoaded () {
  requestAnimationFrame(() => {
    if (props.isLoaded) {
      percentage.value = 100
    } else if (!props.isLoaded && percentage.value < 70) {
      percentage.value += 1
      checkIsLoaded()
    }
    loadingRef.value!.style.setProperty('--percentage', `${percentage.value}%`)
  })
}

onMounted(() => {
  checkIsLoaded()
})

</script>
<style lang="less" scoped>
.loading {
  --percentage:0%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: #121212;
  user-select: none;
  .progress{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 10px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: inset 0 0 2px #fff,  0 0 2px #fff;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      background-color: #fff;
      transition: all 2s;
      transform: translateX(calc(var(--percentage) - 100%));
    }
  }
}
</style>
