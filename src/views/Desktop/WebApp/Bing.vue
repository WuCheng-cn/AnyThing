<template>
  <div class="container">
    <iframe
      v-lazyResize:50
      class="view"
      src="https://cn.bing.com/?mkt=zh-cn&mkt=zh-cn&mkt=zh-cn&mkt=zh-cn&mkt=zh-cn&mkt=zh-cn" 
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
