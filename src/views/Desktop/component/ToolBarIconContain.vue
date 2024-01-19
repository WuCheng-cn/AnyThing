<template>
  <div class="toolBarIconContain">
    <slot />
  </div>
</template>
<style lang="less" scoped>
.toolBarIconContain{
  position: relative;
  width: 32px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .5s;
  color: #fff;
  font-size: 20px;
  &:hover{
    cursor: pointer;
    background-color: #f2f2f225;
    border-radius: 4px;
  }
}
</style>
