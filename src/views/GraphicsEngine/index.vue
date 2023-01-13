<!--
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-03 16:37:40
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 14:52:30
 * @FilePath: \anything\src\views\GraphicsEngine\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
-->
<template>
  <Panle has-slider>
    <div
      ref="box"
      v-resize:200="handleResize"
      class="box"
    >
      <div id="container" class="container" :style="containerStyle" />
    </div>
  </Panle>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref, computed } from 'vue'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Panle } from '@/components/UI'
import { useConfig } from '@/store/index'

const box = ref<HTMLElement>()
const graph:Ref<Graph|null> = ref(null)

const boxWidth = ref(0)
const handleResize = (e:ResizeObserverEntry[]) => {
  console.log('resize')
  console.log(e[0].devicePixelContentBoxSize[0].inlineSize)
  boxWidth.value = e[0].devicePixelContentBoxSize[0].inlineSize
}

const containerStyle = computed(() => {
  const expectWidth = useConfig.graph().expectWidth
  const expectHeight = useConfig.graph().expectHeight
  const ratio = boxWidth.value / expectWidth  
  const str = `width:${expectWidth}px;height:${expectHeight}px;transform:scale(${ratio});`
  return str
})
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
const init = () => {
  const container = document.getElementById('container') as unknown as HTMLElement
  graph.value = new Graph({
    container,
    // 启用滚轮缩放画布
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
    background: {
      color: '#fffbe6', // 设置画布背景颜色
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  })
  // 启用对齐线
  graph.value.use(
    new Snapline({
      enabled: true,
      className: 'any-snapline',
      clean: false,
    }),
  ).use(
    new Transform({
      resizing: {
        enabled: true, // 是否支持调整节点大小
        minWidth: 40, // 最小的调整宽度
        minHeight: 40, // 最小的调整高度
        maxWidth: Infinity, // 最大的调整宽度
        maxHeight: Infinity, // 最大的调整高度
        orthogonal: true, // 是否显示中间调整点
        restrict: true, // 调整大小边界限制
        autoScroll: false, // 拖动位置超过画布时是否自动滚动画布
        preserveAspectRatio: true, // 调整大小过程中是否保持节点的宽高比例
        allowReverse: false, // 到达最小宽度或者高度时是否允许控制点反向拖动
      },
    }),
  ).use(
      new Selection({
        enabled: true,
        showNodeSelectionBox: true,
      }),
    ).use(
      new Clipboard({
        enabled: true,
        useLocalStorage: true,
      }),
    )
  
  graph.value.fromJSON(data)
}
onMounted(() => {
  init()
})

</script>

<style>
.any-snapline .x6-widget-snapline-horizontal,
.any-snapline .x6-widget-snapline-vertical
{
    stroke: #8f8f8f;
    stroke-width: 1.5;
    stroke-dasharray:6 4;
}
</style>
<style lang="less" scoped>

.box{
  padding: 20px 30px;
}
.container{
  transition: all .3s;
  transform-origin: left top;
}

</style>
