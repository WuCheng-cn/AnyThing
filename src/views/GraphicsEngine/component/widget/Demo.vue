channelReferral.vue 节点组件

<template>
  <!-- 多波次 -->
  <div class="node-box">
    <p> 渠道转介 </p>

    <div>
      <div type="text" @click="edit">
        编辑
      </div>
      <div type="text" class="m-l-1" @click="del">
        删除
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*eslint-disable */
import { defineProps } from 'vue'

const props = defineProps({
  icon: {
    type: String
    // required: true
  },
  text: {
    type: String
    // required: true
  }
})

defineExpose({
  ...props
})

const edit = () => {
  console.log(123123)
}
const del = () => {
  console.log(456456)
}

/*eslint-disable */
</script>

<style scoped lang="less">
.child {
  width: 150px;
  min-height: 100px;
  background: #fff;
  position: absolute;
  left: 60px;
  top: 0;
  display: none;
}
.node-box {
  width: 64px;
  height: 64px;
  border: 1px solid #136fff;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  padding-top: 6px;
  position: relative;
  &:hover {
    background: #136fff;
    color: #fff;
    .child {
      // display: block;
      color: #000;
    }
    .icon {
      color: #fff;
    }
  }
  .icon {
    font-size: 22px;
    color: #136fff;
  }
}
</style>

