<template>
  <!-- 根据<上下行>+<大小图标>+<车辆状态>展示不同图标 -->
  <div class="car" :style="{'background-image': 'url('+`/img/${bgdImg}`+')'}">
    <!-- 小图标不展示信息,大图标信息自定义 -->
    {{ nodeData.isSmall ? '' : nodeData.isPlateNo ? nodeData.plateNo : nodeData.driverName }}
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
const getNode = inject('getNode')
const node = getNode()
const nodeData = ref(node.data)
const bgdImg = ref('')

const setImgUrl = (nodeData) => {
  let img = ''
  img = img.concat(nodeData.direction == 1 ? 'up_' : 'down_')
  img = img.concat(nodeData.isSmall ? 'small_car_' : 'big_car_')
  switch (nodeData.vehicleState) {
    case 0:
      img = img.concat('normal.png')
      break
    case 1:
      img = img.concat('offline.png')
      break
    case 2:
      img = img.concat('warning.png')
      break
    case 3:
      img = img.concat('bunch.png')
      break
  }
  bgdImg.value = 'url(' + `./img/${img}` + ')'
}
setImgUrl(nodeData.value)
onMounted(() => {
  node.on('change:data', ({ current }) => {
    nodeData.value = current
    setImgUrl(nodeData.value)
  })
})
</script>

<style>
.car {
  width: 80px;
  height: 42px;
  text-align: center;
  color: #FFFFFF;
  line-height: 40px;
  font-size: 16px;
  background-image: v-bind(bgdImg);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
</style>
