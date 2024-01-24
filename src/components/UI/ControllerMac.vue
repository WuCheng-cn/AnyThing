<template>
  <div class="any_contorller_mac">
    <div class="contorller contorller-close" @click="onClose()">
      <n-icon class="icon" :component="X" />
    </div>
    <div class="contorller contorller-min" @click="onMinimize()">
      <n-icon class="icon" :component="Minus" />
    </div>
    <div class="contorller contorller-full" @click="onMaximize()">
      <n-icon class="icon" :component="Maximize" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Minus, X, Minimize, Maximize } from '@vicons/tabler'

defineProps({
  onClose: {
    type: Function,
    default: () => () => {
      console.log('onClose')
    },
  },
  onMinimize: {
    type: Function,
    default: () => () => {
      console.log('onMinimize')
    },
  },
  onMaximize: {
    type: Function,
    default: () => () => {
      console.log('onMaximize')
    },
  },
})
</script>
<style lang="less" scoped>
.any_contorller_mac {
  cursor: default;
  width: 68px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  .icon {
    display: none;
    font-weight: bold;
  }

  &:hover {
    .icon {
      display: block;
    }
  }

  .contorller {
    cursor: pointer;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      opacity: .5;
    }

    &-close {
      background-color: #fd5858;
    }

    &-min {
      background-color: #fdbc40;
    }

    &-full {
      background-color: #3cd278;
    }
  }
}</style>
