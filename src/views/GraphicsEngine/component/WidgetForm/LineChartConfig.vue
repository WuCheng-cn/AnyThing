<template>
  <n-space>
    <AText v-model="form.xAxisName" :entity="LineChartConfigEntity" />
    <AText v-model="form.xAxisType" :entity="LineChartConfigEntity" />
    <AText v-model="form.yAxisName" :entity="LineChartConfigEntity" />
    <AText v-model="form.yAxisType" :entity="LineChartConfigEntity" />
  </n-space>
</template>
<script lang="ts" setup>
import { Node } from '@antv/x6'
import { PropType, ref, watch } from 'vue'
import { AText } from '@/components/Form'
import { LineChartConfigEntity } from '@/entity/graph/LineChartConfigEntity'
import { useStore } from '@/store'
import { EChartsOption } from 'echarts'
import { AnyDataHelper } from '@/helper/AnyDataHelper'
const props = defineProps({
  modelValue: {
    type: LineChartConfigEntity,
    default: () => new LineChartConfigEntity(),
  },
  currentNode: {
    type: Object as PropType<Node<Node.Properties>>,
    default: () => ({}),
  },
})

const { graphStore } = useStore()
const form = ref(new LineChartConfigEntity())

watch(() => form.value, (val) => {
  const id = props.currentNode?.id
  const option = graphStore.getRecord(id)
  const newOption:EChartsOption = {
    xAxis: {
      name: val.xAxisName,
      type: val.xAxisType,
    },
    yAxis: {
      name: val.yAxisName,
      type: val.yAxisType,
    },
  }

  id && graphStore.setRecord(id, AnyDataHelper.deepMerge(newOption, option))
})

</script>
