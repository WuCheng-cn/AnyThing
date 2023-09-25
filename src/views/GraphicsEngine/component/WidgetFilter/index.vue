<template>
  <n-el 
    v-resize:0="resize"
    class="any-widget-filter"
    :style="{
      '--widget-filter-width':`${widgetFilterWidth}px`
    }"
  >
    <SearchVue 
      @columns-change="columns = $event"
      @change="searchValue = $event"
    />
    <ListVue 
      v-show="widgetFilterWidth"
      :search-value="searchValue"
      :columns="columns"
      :widget-list="list"
      :on-mousedown="onMousedown"
    />
  </n-el>
</template>
<script lang="ts" setup>
import { ref, PropType, computed } from 'vue'
import ListVue from './list.vue'
import SearchVue from './search.vue'
import { Registry } from '../../widget'
import { InRegistItem } from '@/interface/graph/InRegistItem'

defineProps({
  /**
   * # 拖拽事件
   */
  onMousedown: {
    type: Function as PropType<(e:MouseEvent, item:InRegistItem) => void>,
    default: () => () => ({}),
  },
})

const columns = ref<number>(1)

/**
 * 搜索条件
 */
const searchValue = ref<string>('')

/**
 * # 过滤后的组件
 */
const list = computed(() => {
  return Registry.filter(item => item.name.toLocaleLowerCase().includes(searchValue.value))
})

/**
 * 组件过滤器宽度
 */
const widgetFilterWidth = ref<number>(0)
function resize (e:ResizeObserverEntry[]) {
  widgetFilterWidth.value = e[0].devicePixelContentBoxSize[0].inlineSize
}
</script>
<style lang="less" scoped>
.any-widget-filter{
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
