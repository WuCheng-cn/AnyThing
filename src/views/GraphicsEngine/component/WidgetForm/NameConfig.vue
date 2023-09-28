<template>
  <n-space>
    <AText v-model="form.name" :entity="WidgetConfigEntity" />
    <ANumber v-model="form.width" :entity="WidgetConfigEntity" />
    <ANumber v-model="form.height" :entity="WidgetConfigEntity" />
  </n-space>
</template>
<script lang="ts" setup>
import { ref, watch, PropType } from 'vue'
import { AText, ANumber } from '@/components/Form'
import { WidgetConfigEntity } from '@/entity/graph/WidgetConfigEntity'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: WidgetConfigEntity,
    default: () => new WidgetConfigEntity(),
  },
  resizeHandler: {
    type: Function as PropType<(width:number, height:number) => void>,
    default: () => (width:number, height:number) => {
      console.log('resizeHandler', width, height)
    },
  },
})

const form = ref(new WidgetConfigEntity())

watch(
  () => props.modelValue,
  (newValue) => {
    form.value = newValue
    console.log('watch', newValue)
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(
  () => form.value,
  (newValue) => {
    emits('update:modelValue', newValue)
    props.resizeHandler(form.value.width, form.value.height)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>
