<template>
  <div class="station_route">
    <Routeheader class="station_route_header" @changeCarNum="changeCarNum" @changeRoute="changeRoute" />
    <div class="station_route_main">
      <div v-for="(item,index) in routeDatas" :key="item.routeId">
        <CarStationLine
          :route-data="item"
          :is-plate-no="isPlateNo"
          :index="index"
          @showCarDialog="showCarDialog"
        />
      </div>
    </div>
    <component
      :is="CarNodeDialog" 
      v-if="dialog_isShow" 
      v-click-outside="hideDialog" 
      :x="dialog_x" 
      :y="dialog_y" 
      :dialog_data="dialog_data"
      @closeDilog="hideDialog"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Routeheader from './components/header.vue'
import CarStationLine from './components/CarStationLine/CarStationLine.vue'
import CarNodeDialog from './components/CarStationLine/customNodeVue/Dialog.vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { res, MergeRes } from '@/mock/routeMock.js'
const routeDatas = ref([...res, [...MergeRes]])
const selectRoute = () => {
  console.log(1)
}
// 车辆弹出层位置信息
const dialog_isShow = ref(false)
const dialog_x = ref(111)
const dialog_y = ref(111)
const dialog_data = ref(null)
const showCarDialog = (e) => {
  if (!dialog_isShow.value) {
    dialog_isShow.value = true
    dialog_data.value = e.node.data
    dialog_x.value = e.e.clientX
    dialog_y.value = e.e.clientY
  }
}
const hideDialog = (e) => {
  dialog_isShow.value = false
}

window.addEventListener('scroll', function () {
  dialog_isShow.value = false
})

const isPlateNo = ref(false)
const changeCarNum = (boolean) => {
  // console.log('changeCar',boolean);
  isPlateNo.value = boolean
}
const changeRoute = () => {
  console.log('changeRoute') 
}
</script>

<style lang="less" scoped>
.station_route{
  width: 100%;
  // position: relative;
  height: 100%;
  background-color: #1c2f61;
  .station_route_header{
    width: 100%;
    // position: relative;
    // z-index: 9;
  }
}
.station_route_main{
  padding: 18px 30px;
}

</style>
