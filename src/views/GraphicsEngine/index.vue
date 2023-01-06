<!--
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-03 16:37:40
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-06 17:35:32
 * @FilePath: \anything\src\views\GraphicsEngine\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
-->
<template>
  <Panle has-slider>
    <div id="container" style="width: 100%;height: 100%;" />
  </Panle>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Graph } from '@antv/x6'
import { Panle } from '@/components/UI'

const graph = ref()
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
}
function init () {
  const container = document.getElementById('container') as unknown as HTMLElement
  graph.value = new Graph({
    container,
    background: {
      color: '#fffbe6', // 设置画布背景颜色
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  })
  graph.value.fromJSON(data)
}
onMounted(() => {
  init()
})

</script>
