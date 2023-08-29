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
        内容
        <template #footer>
          尾部
        </template>
      </n-card>
    </n-modal>
    <AButton @click="AnyDialogHelper.showModel(CodeView)">打开弹窗</AButton>
    <AButton @click="showModal = !showModal">打开弹窗</AButton>
  </Panle>
</template>
<script lang="ts" setup>
import { AButton, Panle } from '@/components/UI'
import { AnyDialogHelper } from '@/helper/AnyDialogHelper'
import CodeView from '@/views/CodeView/index.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>
