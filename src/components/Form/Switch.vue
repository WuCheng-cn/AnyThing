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
import { AnyFormFieldProps } from '@/model/basic/AnyFormFieldProps'
import { AnyFormFieldConfig } from '@/model/basic/AnyFormFieldConfig'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnyFormFieldProps(),
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

/**
 * 绑定数据
 */
const value = ref<string|number|boolean>('')
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
