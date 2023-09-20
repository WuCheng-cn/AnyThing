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
        v-resize:100="resize"
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
import { onMounted, ref, defineComponent, watch } from 'vue'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Graph } from '@antv/x6'
import { useStore } from '@/store'
import { useConfig } from '@/config'
import { Registry } from './component/index'
import { AButton, Panle } from '@/components/UI'
import { getTeleport } from '@antv/x6-vue-shape'
import { InRegistItem } from '@/interface/graph/InRegistItem'
import GraphicsHelper from '@/views/GraphicsEngine/index'

const graph = ref<Graph>()
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
GraphicsHelper.registComponent(Registry)

/**
 * @description: 画布自适应
 */
function resize (e:ResizeObserverEntry[]) {
  const boxWidth = e[0].devicePixelContentBoxSize[0].inlineSize
  const boxHeight = e[0].devicePixelContentBoxSize[0].blockSize
  graph.value?.resize(boxWidth, boxHeight)
  graph.value?.zoomToFit({
    padding: 20,
  })
}

/**
 * @description: 拖拽组件
 */
function handleDrag (e:MouseEvent, item:InRegistItem) {
  if (!graph.value) return
  const dnd = new Dnd({
    target: graph.value as Graph,
    getDragNode: (node) => node.clone({ keepId: true }),
    getDropNode: (node) => node.clone({ keepId: true }),
  })
  const node = graph.value.createNode({
    shape: item.nodeShape,
  })
  dnd.start(node, e)
}

/**
 * @description: 初始化画布
 */
onMounted(() => {
  const container = document.getElementById('container') as HTMLElement
  graph.value = GraphicsHelper.create(container)
  // 将Screen组件添加进画布
  graph.value.addNode({ shape: 'Screen', x: 20, y: 20 })

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
  overflow: hidden;
  .container{
    width: 100%;
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
