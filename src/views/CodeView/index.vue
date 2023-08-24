<template>
  <Panle>
    <MonacoEditer :new-value="newValue" :old-value="oldValue" :language="language" />
    <template #slider-left>
      <n-space>
        <AButton @click="addCurrentCode">添加当前版本</AButton>
        <AButton @click="addHistoryCode">添加历史版本</AButton>
      </n-space>
    </template>
  </Panle>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import MonacoEditer from '@/components/MonacoEditor/index.vue'
import { AButton, Panle } from '@/components/UI'
import { AnyFileHelper } from '@/helper/AnyFileHelper'

const language = ref('json')
const newValue = ref('')
const oldValue = ref('')

/**
 * 添加当前版本
 */
async function addCurrentCode () {
  console.log('addCurrentCode')
  const [FileSystemFileHandle] = await window.showOpenFilePicker()
  const file = await FileSystemFileHandle?.getFile()
  const reslut = await AnyFileHelper.readFileAsText(file)
  newValue.value = reslut
}

/**
 * 添加历史版本
 */
async function addHistoryCode () {
  console.log('addHistoryCode')
  const [FileSystemFileHandle] = await window.showOpenFilePicker()
  const file = await FileSystemFileHandle?.getFile()
  const reslut = await AnyFileHelper.readFileAsText(file)
  oldValue.value = reslut
}
</script>
