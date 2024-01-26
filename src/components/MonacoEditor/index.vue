<template>
  <div style="width: 100%;height: 100%;">
    <div ref="container" class="code-editor" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

self.MonacoEnvironment = {
  getWorker (_: string, label: string) {
    if (label === 'json') {
      return new JsonWorker()
    }
    return new EditorWorker() 
  },
}

const props = defineProps({
  language: {
    type: String,
    default: 'json',
  },
  oldValue: {
    type: String,
    default: 'aaa',
  },
  newValue: {
    type: String,
    default: 'aaab',
  },
})
const container = ref<HTMLElement>()
let monacoDiffInstance:monaco.editor.IStandaloneDiffEditor
let originalModel:monaco.editor.ITextModel 
let modifiedModel:monaco.editor.ITextModel 
const defaultOpts = ref<monaco.editor.IStandaloneDiffEditorConstructionOptions>({
  theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
  roundedSelection: false, // 右侧不显示编辑器预览框
  autoIndent: 'keep', // 自动缩进
  readOnly: false, // 是否只读
  selectOnLineNumbers: true, // 显示行号
  automaticLayout: true, // 自动布局
})

watch(
  () => props.newValue,
  (newVal) => {
    modifiedModel = monaco.editor.createModel(newVal, props.language)
    if (monacoDiffInstance) {
      monacoDiffInstance.setModel({
        original: originalModel as monaco.editor.ITextModel,
        modified: modifiedModel as monaco.editor.ITextModel,
      })
    }
  },
  { immediate: true },
)

watch(
  () => props.oldValue,
  (newVal) => {
    originalModel = monaco.editor.createModel(newVal, props.language)
    if (monacoDiffInstance) {
      monacoDiffInstance.setModel({
        original: originalModel as monaco.editor.ITextModel,
        modified: modifiedModel as monaco.editor.ITextModel,
      })
    }
  },
  { immediate: true },
)
function init () {
  monacoDiffInstance = monaco.editor.createDiffEditor(container.value!, defaultOpts.value)
  originalModel = monaco.editor.createModel(props.oldValue, props.language)
  modifiedModel = monaco.editor.createModel(props.newValue, props.language)

  monacoDiffInstance.setModel({
    original: originalModel as monaco.editor.ITextModel,
    modified: modifiedModel as monaco.editor.ITextModel,
  })
}
onMounted(() => {
  init()
})
</script>
<style scoped>
.code-editor {
    width: 100%;
    min-height: 200px;
    height: 100%;
}
</style>
