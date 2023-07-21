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
    <template #slider>
      <div @mousedown="handleDrag">xxxx</div>
    </template>
    <div
      ref="box"
      v-resize:200="handleResize"
      class="box"
    >
      <div id="container" class="container" :style="containerStyle" />
      <TeleportContainer />
    </div>
  </Panle>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, defineComponent } from 'vue'
import { Graph } from '@antv/x6'
import { Panle } from '@/components/UI'
import { useConfig } from '@/store/index'
import GraphicsMaker from '@/views/GraphicsEngine/index'
import { Dnd } from '@antv/x6-plugin-dnd'
import { register, getTeleport } from '@antv/x6-vue-shape'
import { LineChart, WidgetImage } from './component/index'

register({
  shape: 'custom-vue-node',
  width: 600,
  height: 600,
  component: LineChart,
})
const box = ref<HTMLElement>()
const graph = ref<Graph>()
const boxWidth = ref(0)
const TeleportContainer = getTeleport()
defineComponent({
  name: 'TeleportContainer',
  components: {
    TeleportContainer,
  },
})
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

function handleDrag (e:MouseEvent) {
  const dnd = new Dnd({
    target: graph.value as Graph,
  })
  const node = graph.value!.createNode({
    shape: 'custom-vue-node',
  })
  dnd.start(node, e)
}
onMounted(() => {
  const container = document.getElementById('container') as HTMLElement
  graph.value = new GraphicsMaker().create(container)
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
