<!--
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-06 16:26:55
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-06 16:38:34
 * @FilePath: \anything\src\components\UI\Panle.vue
 * @Description: 面板组件，用于整体布局，默认插槽为中部主体区域；另带头部、底部插槽。 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
-->
<template>
  <div class="any-panle">
    <slot />
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped>
  .any-panle{
    flex: 1;
    width: 0;
  }
</style>
