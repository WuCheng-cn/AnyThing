<template>
  <div class="loading" @contextmenu.prevent>
    <div class="title">
      {{ packageJson.name }}
    </div>
    <div class="progress" @animationend="onAnimationend" />
  </div>
</template>
<script lang="ts" setup>
import packageJson from '@/../package.json'

const emits = defineEmits<{(event: 'animationend', data: void): void;}>()

function onAnimationend () {
  emits('animationend')
}

</script>
<style lang="less" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: #121212;
  user-select: none;
  filter: contrast(20);

  .title {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%,-100%) !important; 
    font-size: 66px !important;
    height: 80px !important;
    line-height: 80px !important;
    font-weight: bold !important;
    color: #fff !important;
    text-shadow: 0 0 4px #fff !important;
    animation: mixinIn 3s !important;
  }

  .progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 8px;
    border-radius: 4px;
    background-color: #121212;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background-color: #fff;
      animation: progress 3s;
    }
  }
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes mixinIn {
  0% {
    opacity: 0;
    filter: blur(30px)
  }

  30% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}</style>
