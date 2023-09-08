<template>
  <n-input
    v-model:value="value" 
    :placeholder="placeholderComputed"
    @on-input="emits('update:modelValue', $event.target.value)"
  />
</template>
<script lang="ts" setup generic="T extends AnBasic">
import { ref, watch, computed } from 'vue'
import { AnFormFieldPropsType } from '@/model/basic/AnFormFieldProps'
import { AnFormFieldConfig } from '@/model/fieldConfig/AnFormFieldConfig'
import { AnBasic } from '@/model/basic/AnBasic'
import { ClassConstructor } from 'class-transformer'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<AnFormFieldPropsType>()

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue ?? ''
  },
  {
    deep: true,
  },
)

/**
 * 绑定数据
 */
const value = ref<string>('')

/**
 * 字段的表单配置信息
 */
const fieldConfig = ref<AnFormFieldConfig | null>(null)

/**
 * 占位符信息
 */
const placeholderComputed = computed(() => {
  if (props.placeholder) {
    return props.placeholder
  } else if (fieldConfig.value?.placeholder) {
    return fieldConfig.value?.placeholder
  } else if (fieldConfig.value?.label) {
    return `请输入${fieldConfig.value?.label}...`
  } else if (props.entity) {
    return `请输入${props.entity.getCustomFieldName()}...`
  } else {
    return '请输入...'
  }
})

/**
 * 初始化
 */
const init = () => {
  // fieldConfig.value = props.entity?.prototype.getFieldConfig(props.fieldName) ?? null
}

</script>
