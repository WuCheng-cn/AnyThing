<template>
  <div id="chart" ref="chart" style="width: 100%;height: 100%;" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { convertData, geoCoordMap, XAData } from './FlightChart'
import * as echarts from 'echarts'
import 'echarts-extension-amap'
import AMapLoader from '@amap/amap-jsapi-loader'

const AMap = null

const chartRef = ref()
// 箭头样式
const planePath =
      'path://M482.73408 403.02592a40.96 40.96 0 0 1 59.71968-1.90464l144.81408 144.7936a40.96 40.96 0 1 1-57.91744 57.9584l-115.79392-115.8144-115.95776 115.95776a40.96 40.96 0 0 1-57.91744-57.93792l143.0528-143.0528z'
// var planePath = 'arrow';
const color = ['#18a0ff'] // 航线的颜色
const series:any = [];
[
  ['郑州', XAData],
].forEach((item, i) => {
  console.log(item[0])
  series.push(
    { // 红线动态特效
      name: item[0] + ' Top1', // 此时item[0]存储的是郑州,即此时name为“郑州Top1”
      type: 'lines',
      zlevel: 1, // zlevel用于Canvas分层，不同的zlevel值的图形会放置在不同的Canvas中，值大的在值小的上面。
      coordinateSystem: 'amap', // 使用地理坐标系
      effect: {
        show: true, // 是否展示特效
        period: 6, // 动画的周期，秒数。
        trailLength: 0.7, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
        color: '#18a0ff', // arrow箭头的颜色
        symbolSize: 3, // 线两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 0, // 飞行路线宽度  
          curveness: 0.2, // 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
        },
      },
      data: convertData(item[1]),
    },
    { // 箭头移动动态路线
      name: item[0] + ' Top2',
      type: 'lines',
      zlevel: 2, // 同上
      symbol: ['none', 'arrow'], // 图元的图形类别
      coordinateSystem: 'amap', // 使用地理坐标系
      symbolSize: 10,
      effect: {
        show: true, // 是否展示特效
        period: 6, // 动画的周期，秒数。
        trailLength: 0, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
        symbol: planePath, // 箭头的样式，前面有定义。
        symbolSize: 11, // 这里指箭头大小，
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 1, // 飞行路线宽度  
          opacity: 0.6,
          curveness: 0.2, // 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
        },
      },
      data: convertData(item[1]),
    },
    { // 坐标点特效设置
      name: item[0] + ' Top3',
      type: 'effectScatter', // 带有涟漪特效动画的气泡图
      coordinateSystem: 'amap', // 使用地理坐标系
      zlevel: 2, // 控制图层前后显示，值大的在值小的上面（覆盖式 ）。
      rippleEffect: { // 涟漪特效相关配置。
        brushType: 'stroke', // 设置为波纹式特效
      },
      label: {
        normal: {
          show: false,
          position: 'right',
          formatter: '{b}',
        },
      },
      symbolSize: function (val) {
        return 10
      },
      itemStyle: {
        normal: {
          color: color[i],
        },
        emphasis: {
          areaColor: '#2B91B7',
        },
      },
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[1].name,
          value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
        }
      }),
    },
  )
})
const option = {
  amap: {
    zoom: 10,
    zooms: [3, 20],
    mapStyle: 'amap://styles/darkblue', // 地图主题
    center: [110, 33], // 中心点
    lang: 'en',
    resizeEnable: true,
  },
  tooltip: { // 当鼠标放航线上提示框的显示
    trigger: 'item',
    formatter: (params, ticket, callback) => {
      if (params.seriesType == 'effectScatter') {
        return '城市：' + params.data.name + '<br />人数：' + params.data.value[2]
      } else if (params.seriesType == 'lines') {
        return (
          params.data.fromName + '---->' + params.data.toName +
              '<br />人数：' + params.data.value
        )
      } else {
        return params.name
      }
    },
  },
  // legend: { // 右下角图例组件设置 
  //   orient: 'vertical', // 图例列表的布局朝向
  //   top: 'bottom',
  //   left: 'right',
  //   data: ['郑州 Top1'],
  //   textStyle: {
  //     color: '#fff',
  //   },
  //   selectedMode: 'multiple',
  // },
  // geo: {
  //   map: 'henan', // 这里使用的echarts库河南图层！
  //   label: {
  //     // emphasis: {
  //     show: true,
  //     color: '#fff',
  //     // }
  //   },
  //   // 把河南地图放大了1.2倍
  //   zoom: 1.2,
  //   roam: true,
  //   // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
  //   itemStyle: {
  //     normal: {
  //       // 地图省份的背景颜色
  //       areaColor: 'rgba(20, 41, 87,0.6)',
  //       borderColor: '#195BB9',
  //       borderWidth: 1,
  //     },
  //     emphasis: { // 对应的鼠标悬浮效果
  //       areaColor: '#2B91B7',
  //     },
  //   },
  // },
  series, // 前方series数组已经配置好
}
onMounted(() => {
  // eslint-disable-next-line no-underscore-dangle
  (window as any)._AMapSecurityConfig = {
    securityJsCode: '5b33f7ae80df6c492f49f13f7636c440',
  }
  AMapLoader.load({
    key: '713f18a5b6a14a4e287819a08840c2a3', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
  .then((AMap) => {
    const myChart = echarts.init(document.getElementById('chart') as HTMLElement)
    myChart.setOption(option)
    const amap = (myChart as any).getModel().getComponent('amap')
    .getAMap()
    
    amap.setFitView()
  })
  .catch((e) => {
    console.log(e)
  })
})
</script>
<style lang="less" scoped></style>
