<template>
  <n-switch
    :rubber-band="rubberBand"
    :value="value"
    :round="props.round"
    :disabled="props.disabled"
    :checked-value="fieldConfig?.checkedValue ?? true"
    :un-checked-value="fieldConfig?.unCheckedValue ?? false"
  />
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { AnFormFieldProps } from '@/model/basic/AnFormFieldProps'
import { AnFormFieldConfig } from '@/model/fieldConfig/AnFormFieldConfig'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnFormFieldProps(),
  /**
   * # 是否圆角
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * # 是否橡皮筋效果
   */
  rubberBand: {
    type: Boolean,
    default: false,
  },

})

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = (newValue as string|number|boolean) ?? ''
  },
  {
    deep: true,
  },
)
watch(
  () => value.value,
  (newValue) => {
    emits('update:modelValue', newValue)
  },
  {
    deep: true,
  },
)

/**
 * 绑定数据
 */
const value = ref<string|number|boolean>('')

/**
 * 字段的表单配置信息
 */
const fieldConfig = ref<AnFormFieldConfig | null>(null)

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
