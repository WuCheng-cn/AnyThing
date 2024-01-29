<template>
  <div class="cesium-container">
    <n-spin v-show="isLoading" size="medium" />
    <div
      id="cesium-viewer"
      ref="viewerDivRef"
      v-lazyResize 
      v-resize:100="resizeCesiumView"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TileMapServiceImageryProvider, Viewer, UrlTemplateImageryProvider, ProviderViewModel } from 'cesium'
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

let viewer: Viewer | null = null

const viewerDivRef = ref<HTMLDivElement>()

const isLoading = ref(false)

window.CESIUM_BASE_URL = 'libs/cesium/'

function init () {
  isLoading.value = true
  const script = document.createElement('script')
  script.src = 'libs/cesium/Cesium.js'
  script.type = 'text/javascript'
  script.async = true
  script.onload = () => {
    isLoading.value = false
    renderView()
  }
  document.body.appendChild(script)
} 

function renderView () {
  viewer = new Viewer(viewerDivRef.value as HTMLElement, {
    imageryProvider: new UrlTemplateImageryProvider({
      url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    }),
    // baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
    geocoder: false, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
    navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
    homeButton: false, // 如果设置为false，将不会创建右上角主页(房子)按钮。
    sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
    animation: false, // 如果设置为false，将不会创建左下角动画小部件。
    timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
    fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
    scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
    shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
    // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
    infoBox: false, // 是否显示点击要素之后显示的信息
    sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
    requestRenderMode: false, // 启用请求渲染模式，不需要渲染，节约资源吧
    fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处，虽然我关闭了全屏按钮，但是键盘按F11 浏览器也还是会进入全屏
  })
}

function resizeCesiumView () {
  if (viewer) {
    viewer.resize()
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="less">
.cesium-container{
  width: 100%;
  height: 100%;
}
</style>
