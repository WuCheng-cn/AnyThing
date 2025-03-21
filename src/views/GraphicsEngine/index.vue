<template>
  <Panle show-right-slider>
    <Panle show-left-slider :custom-class-left-slider="['customm-slider-left']">
      <template #slider-left>
        <WidgetFilter :on-mousedown="onMousedown" />
      </template>
      <n-el v-resize:100="resize" class="box">
        <div id="container" class="container" />
        <TeleportContainer />
      </n-el>
    </Panle>
    <template #slider-right>
      <div v-for="item in (currentNode?.getData() as InDefaultOption)?.formConfig" :key="item.title">
        <component
          :is="item.component"
          v-model="item.data"
          :resize-handler="resizeHandler"
          :current-node="currentNode"
        />
      </div>
      <AButton @click="handleClick" />
    </template>
  </Panle>
</template>
<script lang="ts" setup>
import { onMounted, ref, defineComponent } from 'vue'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Graph, Node } from '@antv/x6'
import { useStore } from '@/store'
import { Registry } from './widget/index'
import { AButton, Panle } from '@/components/UI'
import { getTeleport } from '@antv/x6-vue-shape'
import { InRegistItem } from '@/interface/graph/InRegistItem'
import GraphicsHelper from '@/views/GraphicsEngine/index'
import WidgetFilter from './component/WidgetFilter/index.vue'
import { InDefaultOption } from '@/interface/graph/InDefaultOption'
import { InWidgetFormConfig } from '@/interface/graph/InWidgetFormConfig'
import { WidgetConfigEntity } from '@/entity/graph/WidgetConfigEntity'

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
function resize (e: ResizeObserverEntry[]) {
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
function onMousedown (e: MouseEvent, item: InRegistItem) {
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

  graph.value.on('node:selected', ({ node }) => {
    console.log(node)
    console.log(node.getData())
    currentNode.value = node
  })
  graph.value.on('node:resizing', ({ node }) => {
    const { width, height } = node.getSize()
    const data = node.getData() as InDefaultOption
    const baseConfig = data.formConfig.find((item) => item.title === '基础配置') as InWidgetFormConfig
    const fromData = baseConfig.data as WidgetConfigEntity
    fromData.setWidth(width)
    fromData.setHeight(height)
  })
})

const resizeHandler = (width: number, height: number) => {
  currentNode.value?.setSize(width, height)
}

const currentNode = ref<Node<Node.Properties>>()
function handleClick () {
  useStore().graphStore.recordsCenter[currentNode.value?.id || '']?.series[0].data.push(1000)
  useStore().graphStore.recordsCenter[currentNode.value?.id || '']?.xAxis.data.push('x')
}
</script>
<style lang="less">
// 画布的全局样式文件
@import url('./css/index.less');
</style>
<style lang="less" scoped>
@import url('@/assets/css/beautify/anyDynamicFuzzyBackground.less');

.box {
  height: 100%;
  overflow: hidden;

  .container {
    width: 100%;
    height: 100%;
    transition: all .3s;
    transform-origin: left top;
  }
}

.item {
  cursor: grab;

  &:active {
    cursor: grabbing !important;
  }
}

:deep(.customm-slider-left) {
  .n-layout-sider-scroll-container {
    padding: unset !important;

  }
}

:deep(.widget-image) {
  // :deep(.n-image)  {
    width: 100%;

    img {
      width: 100% !important;
    }
  // }
}
</style>
