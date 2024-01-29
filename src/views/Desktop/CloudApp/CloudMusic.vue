<template>
  <div class="container">
    <iframe
      v-lazyResize
      class="view"
      src="https://music.163.com/" 
      frameborder="0"
    />
  </div>
</template>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
