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
      <div
        ref="box"
        v-resize:200="handleResize"
        class="box"
      >
        <div id="container" class="container" :style="containerStyle" />
        <TeleportContainer />
      </div>
    </Panle>
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
import { Registry } from './component/index'
import { RegistItem } from '@/model/graph/RegistInterface'

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
const containerStyle = computed(() => {
  const expectWidth = useConfig.graph().expectWidth
  const expectHeight = useConfig.graph().expectHeight
  const ratio = boxWidth.value / expectWidth  
  const str = `width:${expectWidth}px;height:${expectHeight}px;transform:scale(${ratio});`
  return str
})
/**
 * @description: 初始化注册组件
 */
function init () {
  Registry.forEach(item => {
    register({
      shape: item.nodeShape,
      width: 400,
      height: 400,
      component: item.component,
    })
  })
}
init()

/**
 * @description: 监听容器大小变化
 */
function handleResize (e:ResizeObserverEntry[]) {
  // console.log('resize')
  // console.log(e[0].devicePixelContentBoxSize[0].inlineSize)
  boxWidth.value = e[0].devicePixelContentBoxSize[0].inlineSize
}

/**
 * @description: 拖拽组件
 */
function handleDrag (e:MouseEvent, item:RegistItem) {
  const dnd = new Dnd({
    target: graph.value as Graph,
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

.item{
  cursor: grab;
  &:active{
    cursor: grabbing !important;
  }
}
</style>
