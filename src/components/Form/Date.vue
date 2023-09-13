<template>
  <n-date-picker 
    v-model:value="value"
    input-readonly
    :placement="props.placement"
    :disabled="props.disabled"
    :close-on-select="props.closeOnSelect"
    :is-date-disabled="props.isDateDisabled"
    :placeholder="placeholderComputed"
    :type="fieldConfig?.dateType"
  />
</template>

<script lang="ts" setup>
import { ref, watch, computed, PropType } from 'vue'
import { AnFormFieldProps } from '@/model/basic/AnFormFieldProps'
import { AnFormFieldConfig } from '@/model/fieldConfig/AnFormFieldConfig'
import { EPlacementType } from '@/enum/EPlacementType'
import { IsDateDisabled } from 'naive-ui/es/date-picker/src/interface'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnFormFieldProps(),
  /**
   * # 面板的弹出位置
   * @default bottom
   */
  placement: {
    type: String as PropType<EPlacementType>,
    default: EPlacementType.BOTTOM,
  },
  /**
   * # 日期禁用的校验函数
   * @description 返回true则禁用
   */
  isDateDisabled: {
    type: Function as PropType<IsDateDisabled>,
    default: () => false,
  },
  /**
   * # 选择日期后是否关闭面板
   */
  closeOnSelect: {
    type: Boolean,
    default: false,
  },
})

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = (newValue as number) ?? ''
  },
  {
    deep: true,
  },
)

/**
 * 绑定数据
 */
const value = ref<number|[number, number]>()
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
