<template>
  <div v-resize:200="handleResize" class="box">
    <div ref="chartDom" class="chartDom" />
  </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true,
  },
})
type EChartsOption = echarts.EChartsOption;
const chartDom = ref()
let myChart :echarts.ECharts
const option:EChartsOption = {
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
}
function handleResize () {
  myChart.resize({ animation: { duration: 300 } })
}
onMounted(() => {
  myChart = echarts.init(chartDom.value)
  option && myChart.setOption(option, true)
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
