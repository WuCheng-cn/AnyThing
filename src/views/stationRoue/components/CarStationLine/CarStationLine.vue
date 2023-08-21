<template>
  <div ref="boxCard" class="box_card">
    <div class="cardHeader">
      <div class="routeName">{{ routeName }}</div>
      <div class="line_detail">
        <div class="line_margin">总车数:{{ }}</div>
        <div class="line_margin">上行:{{ }}</div>
        <div class="line_margin">下行:{{ }}</div>
        <div class="line_margin">
          平均速度:上行{{ }}km/h,
          <span>下行{{ }}km/h</span>
        </div>
        <div class="line_margin">运营:{{ }}</div>
        <div class="line_margin">非运营:{{ }}</div>
        <div class="line_margin">
          <el-link type="primary">完成率{{}}</el-link>
        </div>
      </div>
      <div class="changeSize">
        <el-link :underline="false" :style="isSmall ? {color:'white'} : {color:'#79bbff'}" @click="changeSize(false)">大</el-link>
        <el-link class="middle_btn">/</el-link>
        <el-link :underline="false" :style="isSmall ? {color:'#79bbff'} :{color:'white'}" @click="changeSize(true)">小</el-link>
      </div>
    </div>
    <div class="line_main">
      <div class="line_main_left">
        <div class="plant_table">
          <div>{{ 'HD0909' }}</div>
          <div class="middle">{{ 'AAA' }}</div>
          <div>{{ '17:22' }}</div>
        </div>
      </div>
      <div class="line_main_center">
        <div>
          <div :id="'container'+ routeId" class="CarStationLineBox" />
          <TeleportContainer v-if="!isMergeRoute" />
        </div>
      </div>
      <div class="line_main_right">
        <div class="plant_table">
          <div>{{ 'HD0909' }}</div>
          <div class="middle">{{ 'AAA' }}</div>
          <div>{{ '17:22' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRef, watch } from 'vue'
import { Graph } from '@antv/x6'
import { register, getTeleport } from '@antv/x6-vue-shape'
import carNode from './customNodeVue/carNode.vue'
import { initRouteData, initEdgeData, initLoopLineNode, initCarNode, initMergeRouteData } from './graph/graph_copy.js'
// import {initRouteData ,initEdgeData , initLoopLineNode , initCarNode, initMergeRouteData} from './graph/graph.js'
import './customNode/customNode.js'

// const proxy = getCurrentInstance();
const props = defineProps({
  routeData: Object,
  isPlateNo: Boolean,
  index: Number,
})
const isMergeRoute = Object.prototype.toString.call(props.routeData) === '[object Array]'
// 注册车辆Car
register({
  shape: 'car_vue_node',
  width: 100,
  height: 100,
  component: carNode,
})
let TeleportContainer
// antv自定义节点组件
if (!isMergeRoute) {
  const componentsArr = []
  for (let i = 1; i < props.index; i++) {
    componentsArr.push(getTeleport())
  }
  TeleportContainer = componentsArr[props.index]
}

const isSmall = ref(false)
const isPlateNo = toRef(props, 'isPlateNo')

const changeSize = (boolean) => {
  isSmall.value = boolean
}
// 站点线JSON数据
const graphData = ref({
  edges: [],
  nodes: [],
})

// 后端线路原始数据
const { upStationList, downStationList, routeType, vehicleList, routeName, routeId } = props.routeData

// 上下行站点数据
const upRouteNode = ref([])
const downRouteNode = ref([])
// 上下行站间线数据
const upEdge = ref([])
const downEdge = ref([])
// 当前线路所有车辆
const vehicleNode = ref([])
vehicleNode.value = []
// 合并线路
if (Object.prototype.toString.call(props.routeData) === '[object Array]') {
  const { upSubordinateArr, downSubordinateArr, upArr, upLineArr, downArr, downLineArr, downSubordinateLineArr, upSubordinateLineArr } = initMergeRouteData(props.routeData[0])
  // 站点
  upRouteNode.value = [...upSubordinateArr[0], ...upArr]
  downRouteNode.value = [...downSubordinateArr[0], ...downArr]

  // 主线线条
  upEdge.value = [...upLineArr, ...upSubordinateLineArr]
  downEdge.value = [...downLineArr, ...downSubordinateLineArr]
} else if (routeType == 1) {
  /**
  * 直线图demo
  */
  const { upArr, downArr } = initRouteData(upStationList, downStationList)
  upRouteNode.value = upArr
  downRouteNode.value = downArr
  // 上下行站间线数据
  const { upLineArr, downLineArr } = initEdgeData(upArr, downArr)
  upEdge.value = upLineArr
  downEdge.value = downLineArr
  vehicleNode.value = initCarNode(vehicleList, upRouteNode.value, downRouteNode.value, isPlateNo.value, isSmall.value, true)
} else if (routeType == 2) {
  /**
  * 环线demo
  */
  const { loopLineNode, loopLineEdge } = initLoopLineNode(upStationList)
  upRouteNode.value = loopLineNode
  upEdge.value = loopLineEdge
  vehicleNode.value = initCarNode(vehicleList, upRouteNode.value, downRouteNode.value, isPlateNo.value, isSmall.value, false, true)
}
// 车辆去重 todo
const setArr = (arr, key) => {
  const some = []
  arr.forEach(el => {
    if (!some.some(e => e.data[key] == el.data[key])) {
      some.push(el)
    } else {

    }
  })
  return some
}
// console.log(setArr(JSON.parse(JSON.stringify(vehicleNode.value)),'nextStationId'));
vehicleNode.value = setArr(vehicleNode.value, 'nextStationId')

// 添加node+添加edges
graphData.value.nodes = [...upRouteNode.value, ...downRouteNode.value, ...vehicleNode.value]
graphData.value.edges = [...upEdge.value, ...downEdge.value]

// boxRef
const boxCard = ref(null)
const emit = defineEmits(['showCarDialog'])
onMounted(() => {
  // 渲染函数
  const graph = new Graph({
    container: document.getElementById('container' + props.routeData.routeId),
    grid: false, 
    panning: false,
    background: { color: '#091940' },
    interacting: () => {
      return {
        nodeMovable: false,
        edgeMovable: false,
        edgeLabelMovable: false,
      }
    },
  })
  graph.fromJSON(graphData.value)
  graph.centerContent()
  graph.zoom(-0.4)
  graph.on('node:click', (e) => {
    console.log(e)
    if (e.node.shape == 'car_vue_node') {
      emit('showCarDialog', e)
    }
  })
  // 图例事件
  window.addEventListener('resize', () => {
    graph.centerContent()
  })
  watch([isPlateNo, isSmall], () => {
    if (!vehicleNode.value.length) return
    vehicleNode.value.forEach(element => {
      const node = graph.getCellById(element)
      node.setData({ ...node.data, isPlateNo: props.isPlateNo, isSmall: isSmall.value })
    })
  })
})
const Height = ref('200px')
if (isMergeRoute) {
  Height.value = '620px'
}
</script>

<style lang="less" scoped>

  .CarStationLineBox{
    width: 100%;
    height: v-bind(Height);
  }

:deep(text) {
  transform:rotate(90deg)
}

:deep(.el-card__body){
  padding: 0 !important;
}
:deep(.el-divider--horizontal){
  margin: 0;
  // height: 12em;
}
:deep(.el-divider--vertical){
  height: 14em;
}
:deep(.el-button+.el-button) {
  margin-left: 0px
}
.box_card{
  // height: 280px;
  margin-bottom: 18px;
  background-color: #091940;
  display: flex;
  flex-direction: column;
  .cardHeader{
    display: flex;
    padding-right: 20px;
    justify-content: space-between;
    line-height: 40px;
    color: #fff;
    display: flex;
    height: 40px;
    border-bottom: 1px #1b2e5f solid;
    .line_margin{
      margin: 0px 10px;
      font-size: 14px;
    }
    .line_detail{
      flex: 1;
      display: flex;
    }

    .routeName{
      height: 40px;

      border-radius: 0px 10px 0px 0px;
      width: 150px;
      text-align: center;
      color: #fff;
      font-size: 22px;
      font-weight: bold;
      background-color: #668ff5;
      align-items: center;
    }
    .changeSize{
      align-items: center;
      line-height: 40px;
      .middle_btn{
        color: #fff;
        cursor: default;
      }
    }
  }
  .line_main{
    flex: 1;
    display: flex;
    .line_main_left,.line_main_right{
      width: 176px;
      background: #11224b;
      padding: 5px;
      .plant_table{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        text-align: center;
        color: #aaa;
        background: #1C2F61;
        margin-bottom: 3px;
        border: 1px solid #4E5A75;
        border-radius: 3px;
        div{
          flex: 1;
        }
        .middle{
          border-right: 1px solid #4E5A75;
          border-left: 1px solid #4E5A75;
        }
      }
    }
    .line_main_center{
      flex: 1;
    }
    .line_main_left{
      border-right: 1px #1C2F61 solid ;
    }
    .line_main_right{
      border-left: 1px #1C2F61 solid ;
    }
  }
}
</style>
