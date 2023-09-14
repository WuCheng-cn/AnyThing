<template>
  <Panle>
    <div>
      <h1>这是一个Demo页面</h1>
    </div>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="模态框"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          噢！
        </template>
        <Upload />
        <template #footer>
          尾部
        </template>
      </n-card>
    </n-modal>
    <n-space>
      <AButton @click="AnyDialogHelper.showModel(CodeView)">打开弹窗（api调用）</AButton>
      <AButton @click="showModal = !showModal">打开弹窗（组件式）</AButton>
      {{ AnyDateTimeHelper.format('Fri Sep 08 2023 10:20:13 GMT+0800 (中国标准时间)') }}
      <Text v-model="text" />
      <TextArea v-model="text" />
      <Select v-model="sel" />
    </n-space>
  </Panle>
</template>
<script lang="ts" setup>
import { AButton, Panle } from '@/components/UI'
import { AnyDateTimeHelper } from '@/helper/AnyDateTimeHelper'
import { AnyDialogHelper } from '@/helper/AnyDialogHelper'
import CodeView from '@/views/CodeView/index.vue'
import { ref } from 'vue'
import Text from '@/components/Form/Text.vue'
import TextArea from '@/components/Form/TextArea.vue'
import Select from '@/components/Form/Select.vue'
import Upload from '@/components/Form/Upload.vue'
const showModal = ref(false)
const text = ref('')
const sel = ref('')
</script>
