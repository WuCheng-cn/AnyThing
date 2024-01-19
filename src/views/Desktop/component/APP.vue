<template>
  <div class="app_item">
    <div class="main">
      <n-image
        class="app_icon"
        lazy
        preview-disabled
        :width="appIconSize"
        :src="data.icon"
      />
      <div class="app_name">{{ data.name }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { InApp } from '@/interface/desktop/InApp'
import { useConfig } from '@/config'

defineProps({
  data: {
    type: Object as PropType<InApp>,
    required: true,
  },
})

const { appIconSize } = useConfig().DesktopConfig

</script>
<style lang="less" scoped>
.app_item {
  z-index: 2;
  border: 2px dashed transparent;
  cursor: pointer;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  transition: all 0.3s;
  pointer-events: none;

  &[draggable] {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  .app_name {
    opacity: 1;
    transition: all 0.3s;
    font-size: 12px;
    font-weight: bold;
    color: #fff;

  }
}
</style>
