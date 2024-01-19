<template>
  <div class="tool_bar">
    x
  </div>
</template>
<script lang="ts" setup>

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
  justify-content: center;
  background: rgba( 255, 255, 255, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  animation: tool_bar-enter 1s;
  transition: all 1s;
  z-index: 1;
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
