<template>
  <n-input
    v-model:value="value" 
    :round="props.round"
    :disabled="props.disabled"
    :placeholder="placeholderComputed"
    :clearable="fieldConfig?.clearable"
    :maxlength="fieldConfig?.maxLength"
    :minlength="fieldConfig?.minLength"
    @on-input="emits('update:modelValue', $event.target.value)"
  />
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { AnyFormFieldProps } from '@/model/basic/AnyFormFieldProps'
import { AnyFormFieldConfig } from '@/model/basic/AnyFormFieldConfig'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnyFormFieldProps(''),
})

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = (newValue as string) ?? ''
  },
  {
    deep: true,
  },
)

/**
 * 绑定数据
 */
const value = ref<string>('')
watch(
  value,
  (newValue) => {
    emits('update:modelValue', newValue)
  },
  {
    deep: true,
  },
)

/**
 * 字段的表单配置信息
 */
const fieldConfig = ref<AnyFormFieldConfig | null>(null)

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
    const fieldName = ref('')
    for (const key in props.modelModifiers) {
      fieldName.value = key
    }
    return `请输入${props.entity.getCustomFieldName(fieldName.value)}...`
  } else {
    return '请输入...'
  }
})

/**
 * 初始化
 */
function init () {
  const fieldName = ref('')
  for (const key in props.modelModifiers) {
    fieldName.value = key
  }
  if (props.entity && fieldName.value) {
    fieldConfig.value = props.entity.getCustomFormFieldConfig(fieldName.value)
  }
  if (props.modelValue === undefined && fieldConfig.value?.defaultValue !== undefined) {
    // 没有初始化的值 但装饰器设置了默认值
    value.value = fieldConfig.value.defaultValue
    emits('update:modelValue', value.value)
  }
}
init()
</script>
