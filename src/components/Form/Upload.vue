<template>
  <n-upload
    v-model:file-list="value"
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :max="props.max"
    :disabled="props.disabled"
    @remove="handleRemove"
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
import { ref, watch } from 'vue'
import { UploadFileInfo } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import { AnyMessageHelper } from '@/helper/AnyMessageHelper'
import { AnyFormFieldProps } from '@/model/basic/AnyFormFieldProps'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  ...AnyFormFieldProps(),
  /**
   * 最大上传数量
   */
  max: {
    type: Number,
    default: 1,
  },
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
const value = ref<UploadFileInfo[]>([
  {
    id: 'url-test',
    name: 'URL 测试',
    url: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
    status: 'finished',
  },
  {
    id: 'text-message',
    name: '你的短信',
    status: 'error',
  },
  {
    id: 'notification',
    name: '你的通知',
    status: 'finished',
  },
  {
    id: 'contact',
    name: '你的联系人信息',
    status: 'finished',
  },
])

function handleUploadChange (data: { fileList: UploadFileInfo[] }) {
  value.value = data.fileList
}
// eslint-disable-next-line consistent-return
function handleRemove (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  if (data.file.id === 'text-message') {
    new AnyMessageHelper().info('居然没传上去，算了，删了吧')
  } else if (data.file.id === 'notification') {
    new AnyMessageHelper().error('不行，这个有用，不许删')
    return false
  } else if (data.file.id === 'contact') {
    const asyncMessage = new AnyMessageHelper().loading('不知道这个有没有用，等我问问服务器能不能删')
    return new Promise((resolve) => {
      setTimeout(() => {
        asyncMessage.close()
        new AnyMessageHelper().error('不行，他们也不许删这个')
        resolve(false)
      }, 4000)
    })
  }
}
function handleFileListChange () {
  new AnyMessageHelper().info('是的，file-list 的值变了')
  emits('update:modelValue')
}
</script>
