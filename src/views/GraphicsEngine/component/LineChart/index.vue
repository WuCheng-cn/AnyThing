<template>
  <div v-resize:200="handleResize" class="box">
    <div ref="chartDom" class="chartDom" />
  </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref, inject, computed, watch } from 'vue'
import { Node } from '@antv/x6'
import { useStore } from '@/store'

const getNode: any = inject('getNode')
const node = ref<Node>(getNode())

type EChartsOption = echarts.EChartsOption;
const chartDom = ref()
let myChart :echarts.ECharts
const option = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
})
function handleResize () {
  myChart.resize({ animation: { duration: 300 } })
}
onMounted(() => {
  myChart = echarts.init(chartDom.value)
  option.value && myChart.setOption(option.value, true) 
  console.log(node.value)
  useStore().graphStore.setRecord(node.value.id, option.value)
  const record = computed(() => useStore().graphStore.getRecord(node.value.id))
  watch(record, (newVal) => {
    console.log(newVal)
    
    myChart.setOption(newVal, true)
  }, { deep: true })
})

</script>
<style lang="less" scoped>
.box{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chartDom{
    width: 100%;
    height: 100%;
  }
}
  
</style>
