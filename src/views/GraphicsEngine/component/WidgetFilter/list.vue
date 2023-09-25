<template>
  <div class="widget-list">
    <div
      v-for="(item, index) in widgetList"
      :key="index"
      class="widget-item"
      :style="{
        width: `calc((100% - 10px) / ${columns} - 10px)`,
        left: index % columns === 0
          ? '10px'
          : `calc((100% - 10px) / ${columns} * ${index % columns} + 10px )`,
        top: index < columns
          ? '10px'
          : getTopPosition(index),
      }"
    >
      <div class="t">
        <n-ellipsis class="widget-name">
          {{ item.name }}
        </n-ellipsis>
      </div>
      <div class="c">
        <n-image
          class="widget-image"
          lazy
          preview-disabled
          width="auto"
          object-fit="scale-down"
          :src="item.image"
        />
      </div>
      <div class="b" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { InRegistItem } from '@/interface/graph/InRegistItem'
import { PropType } from 'vue'
const props = defineProps({
  /**
   * # 组件列表
   */
  widgetList: {
    type: Array as PropType<InRegistItem[]>,
    default: undefined,
  },
  /**
   * # 列数
   */
  columns: {
    type: Number as PropType<number>,
    default: 1,
  },
})

function getTopPosition (index:number) {
  const widgetFilterWidth = 'var(--widget-filter-width)'
  const widgetItemWidth = `((${widgetFilterWidth} - 10px) / ${props.columns} - 10px)`
  const widgetItemHeiget = `${widgetItemWidth} * 1.25`
  const topPosition = `calc((${widgetItemHeiget} + 10px) * ${Math.floor(index / props.columns)} + 10px)`
  return topPosition
}

</script>
<style lang="less" scoped>
.widget-list {
  position: relative;
  height: 100%;
  padding: 10px;
  overflow: auto;
}

.widget-item {
  transition: all 0.3s var(--cubic-bezier-ease-in-out);
  position: absolute;
  width: 100%;
  aspect-ratio: 1 / 1.25;
  backdrop-filter: blur(15px);
  background-color: var(--table-color);
  border-radius: var(--any-border-radius);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow-2);
  padding: 10px;
  :deep(.widget-name){
    transition: all 0.3s var(--cubic-bezier-ease-in-out);
    font-size: 12px;
  }
  .widget-image{
    transition: all 0.3s var(--cubic-bezier-ease-in-out);
    border: 1px solid var(--border-color);
    border-radius:var(--any-border-radius);
    aspect-ratio: 1/1;
  }
}
</style>
