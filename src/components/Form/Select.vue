<template>
  <n-select
    v-model:value="value"
    filterable
    value-field="key"
    label-field="label"
    placeholder="选择歌曲"
    max-tag-count="responsive"
    :disabled="props.disabled"
    :multiple="props.multiple"
    :clearable="fieldConfig?.clearable"
    :render-option="renderOption"
    :options="((enumRecord ? enumRecord : fieldConfig?.emumRecord)as unknown as SelectMixedOption[]) "
  />
</template>
<script lang="ts" setup>
import { ref, watch, PropType } from 'vue'
import { AnyFormFieldProps } from '@/model/basic/AnyFormFieldProps'
import { AnyFormFieldConfig } from '@/model/basic/AnyFormFieldConfig'
import { InRecord } from '@/interface/base/InRecord'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { RenderOption } from 'naive-ui/es/dropdown/src/interface'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnyFormFieldProps<Array<string | number> | string | number | null>(),
  /**
   * # 枚举值翻译，用于渲染选项 优先级大于fieldConfig.emumRecord
   */
  enumRecord: {
    type: Array as PropType<InRecord[]>,
    default: undefined,
  },
  /**
   * # 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * # 选项的渲染函数
   */
  renderOption: {
    type: Function as PropType<RenderOption>,
    default: undefined,
  },
})

/**
 * 绑定数据
 */
const value = ref<Array<string | number> | string | number | null>('')
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = (newValue as Array<string | number> | string | number | null) ?? ''
  },
  {
    deep: true,
    immediate: true,
  },
)
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
