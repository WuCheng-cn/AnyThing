<template>
  <div class="tool_bar">
    <div class="tool_bar-left">
      <User />
      <slot name="left" />
    </div>
    <div class="tool_bar-center">
      <slot name="center" />
      {{ `${packageJson.name}-${packageJson.version}` }}
    </div>
    <div class="tool_bar-right">
      <WallPaperQuick />
      <Internet />
      <Battery />
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import packageJson from '@/../package.json'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'

const WallPaperQuick = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/WallPaperQuick.vue'))
const Battery = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/Battery.vue'))
const User = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/User.vue'))
const Internet = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/Internet.vue'))
</script>
<style lang="less" scoped>
.tool_bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: #fff;
  background: rgba( 255, 255, 255, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  animation: tool_bar-enter 1s;
  transition: all 1s;
  z-index: 1;
  &-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }
  &-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 10px;
  }
  &-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

// 进入动画
@keyframes tool_bar-enter {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
