<template>
  <n-radio-group
    v-model:value="value" 
    :disabled="props.disabled"
  >
    <n-space>
      <n-radio
        v-for="item in (enumRecord ? enumRecord : fieldConfig?.emumRecord)" 
        :key="item.key"
        :label="item.label"
        :value="item.key"
      />
    </n-space>
  </n-radio-group>
</template>
<script lang="ts" setup>
import { ref, watch, PropType } from 'vue'
import { AnyFormFieldProps } from '@/model/basic/AnyFormFieldProps'
import { AnyFormFieldConfig } from '@/model/basic/AnyFormFieldConfig'
import { InRecord } from '@/interface/base/InRecord'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnyFormFieldProps<string|number|boolean>(),
  /**
   * # 枚举值翻译，用于渲染选项 优先级大于fieldConfig.emumRecord
   */
  enumRecord: {
    type: Array as PropType<InRecord[]>,
    default: undefined,
  },
})

/**
 * 绑定数据
 */
const value = ref<string|number|boolean>('')
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = (newValue as string|number|boolean) ?? ''
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
