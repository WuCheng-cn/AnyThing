<template>
  <Panle show-right-slider>
    <Panle show-left-slider>
      <template #slider-left>
        <div
          v-for="(item,index) in Registry"
          :key="index"
          class="item"
          @mousedown="handleDrag($event,item)"
        >
          {{ item.name }}
        </div> 
      </template>
      <n-el
        ref="box"
        v-resize:200="handleResize"
        class="box"
      >
        <div id="container" class="container" />
        <TeleportContainer />
      </n-el>
    </Panle>
    <template #slider-right>
      <AButton @click="handleClick" />
    </template>
  </Panle>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, defineComponent, watch } from 'vue'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Graph } from '@antv/x6'
import { useStore } from '@/store'
import { useConfig } from '@/config'
import { Registry } from './component/index'
import { AButton, Panle } from '@/components/UI'
import { register, getTeleport } from '@antv/x6-vue-shape'
import { InRegistItem } from '@/interface/graph/InRegistItem'
import GraphicsMaker from '@/views/GraphicsEngine/index'

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

/**
 * @description: 初始化注册组件
 */
GraphicsMaker.registComponent(Registry)

/**
 * @description: 监听容器大小变化
 */
function handleResize (e:ResizeObserverEntry[]) {
  boxWidth.value = e[0].devicePixelContentBoxSize[0].inlineSize
}

/**
 * @description: 拖拽组件
 */
function handleDrag (e:MouseEvent, item:InRegistItem) {
  const dnd = new Dnd({
    target: graph.value as Graph,
    getDragNode: (node) => node.clone({ keepId: true }),
    getDropNode: (node) => node.clone({ keepId: true }),
  })
  const node = graph.value!.createNode({
    shape: item.nodeShape,
  })
  dnd.start(node, e)
}

/**
 * @description: 初始化画布
 */
onMounted(() => {
  const container = document.getElementById('container') as HTMLElement
  graph.value = GraphicsMaker.create(container)
  // 将Screen组件添加进画布
  graph.value.addNode({
    shape: 'Screen',
    x: 20,
    y: 20,
    width: useConfig().GraphConfig.expectWidth,
    height: useConfig().GraphConfig.expectHeight,
  })

  graph.value.on('node:selected', ({ node, options }) => {
    console.log(node)
    console.log(options)
    currentData.value = node.id
  })

  // 监听明暗主题变化
  watch(() => useConfig().AppConfig.theme, () => {
    graph.value?.drawBackground({
      color: useConfig().AppConfig.theme.common.tableColor, 
    })
  }, { immediate: true, deep: true })
})

const currentData = ref('')
function handleClick () {
  useStore().graphStore.recordsCenter[currentData.value]?.series[0].data.push(1000)
  useStore().graphStore.recordsCenter[currentData.value]?.xAxis.data.push('x')
}
</script>
<style lang="less">
// 画布的全局样式文件
@import url('./css/index.less');
</style>
<style lang="less" scoped>
.box{
  height: 100%;
  .container{
    width: 100vw;
    height: 100%;
    transition: all .3s;
    transform-origin: left top;
    box-shadow: var(--box-shadow-3);
  }
}

.item{
  cursor: grab;
  &:active{
    cursor: grabbing !important;
  }
}
</style>
