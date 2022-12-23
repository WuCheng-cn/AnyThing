<template>
  <n-drawer v-model:show="showOuterRef" :width="502">
    <n-drawer-content title="主题设置">
      <n-switch v-model:value="props.theme" :round="false" :on-update:value="handleUpdate">
        <template #checked>
          白天
        </template>
        <template #unchecked>
          黑暗
        </template>
      </n-switch>
    </n-drawer-content>
  </n-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const showOuterRef = ref(false)
const doShowOuter = () => {
  showOuterRef.value = true
}
const props = defineProps(['theme'])
const emitFn = defineEmits(['update:theme'])
const handleUpdate = (value:boolean) => {
  emitFn('update:theme', value)
}

defineExpose({
  doShowOuter,
})
</script>
