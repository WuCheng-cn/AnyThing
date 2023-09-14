<template>
  <n-upload
    v-model:file-list="value"
    multiple
    directory-dnd
    :max="props.max"
    :data="props.payload"
    :action="props.action"
    :headers="props.headers"
    :accept="acceptComputed"
    :disabled="props.disabled"
    @remove="handleRemove"
    @change="handleUploadChange"
    @update:file-list="handleFileListChange"
  >
    <n-upload-dragger>
      <n-icon size="48" :depth="3">
        <CloudUploadOutline />
      </n-icon>
      <br>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
    </n-upload-dragger>
  </n-upload>
</template>
<script lang="ts" setup>
import { PropType, ref, watch, computed } from 'vue'
import { UploadFileInfo } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import { AnyMessageHelper } from '@/helper/AnyMessageHelper'
import { AnyFormFieldProps } from '@/model/basic/AnyFormFieldProps'
import { AnyFileEntity } from '@/entity/base/AnyFileEntity'
import { AnyClassTransformHelper } from '@/helper/AnyClassTransformHelper'
import { EFileExtentionType } from '@/enum/EFileExtentionType'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnyFormFieldProps<AnyFileEntity[]>(),
  /**
   * # 文件上传地址
   */
  action: {
    type: String,
    default: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
  },

  /**
   * # 文件类型
   */
  accept: {
    type: Array as PropType<EFileExtentionType[]>,
    default: () => [EFileExtentionType.Document],
  },

  /**
   * # 最大上传数量
   */
  max: {
    type: Number,
    default: 1,
  },

  /**
   * # 文件上传需要额外携带的参数
   */
  payload: {
    type: Object as PropType<Record<string, any>>,
    default: undefined,
  },

  /**
   * # 额外的请求头
   */
  headers: {
    type: Object as PropType<Record<string, any>>,
    default: undefined,
  },

  /**
   * # 移除文件前的回调
   * @description 返回 false 或者 Promise.reject 时停止删除
   */
  onRemove: {
    type: Function as PropType<(data: { file: AnyFileEntity; fileList: AnyFileEntity[] }) => boolean | Promise<boolean>>,
    default: undefined,
  },
  
})
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue ?? []
  },
  {
    deep: true,
  },
)

/**
 * # 接收文件类型
 */
const acceptComputed = computed(() => {
  return props.accept.join(',')
})

/**
 * 绑定数据
 */
const value = ref<AnyFileEntity[]>([])
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
 * # 上传文件变化
 */
function handleUploadChange (data: { fileList: UploadFileInfo[] }) {
  value.value = AnyClassTransformHelper.parseArray(data.fileList, AnyFileEntity) 
}

/**
 * # 移除文件
 */
// eslint-disable-next-line consistent-return
function handleRemove (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  /**
   * 转换为AnyFileEntity 方便扩展模型操作
   */
  const parseData = {
    file: AnyClassTransformHelper.parse(data.file, AnyFileEntity),
    fileList: AnyClassTransformHelper.parseArray(data.fileList, AnyFileEntity),
  }
  props.onRemove?.(parseData)
}

/**
 * # 文件列表变化
 */
function handleFileListChange () {
  new AnyMessageHelper().info('是的，file-list 的值变了')
  emits('update:modelValue')
}
</script>
