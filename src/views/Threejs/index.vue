<template>
  <div ref="webglRenderContent" class="webgl-render-content" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const webglRenderContent = ref()

// 创建场景
const scene = new THREE.Scene()

// 创建一个长方体几何对象
const geometry = new THREE.BoxGeometry(100, 100, 100)

// 创建一个材质对象（基础材质-不受光照影响）
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff, // 设置材质颜色
  transparent: false, // 开启透明
  opacity: 0.5, // 设置透明度
})

// 通过几何对象和材质对象创建一个网格模型
const mesh = new THREE.Mesh(geometry, material)

// 将网格模型添加到场景中
scene.add(mesh)

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150)
scene.add(axesHelper)

// 设置网格模型的空间坐标
mesh.position.set(0, 0, 0)

// 创建一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机的空间坐标
camera.position.set(200, 200, 200)

// 设置相机观察的目标点（网格对象的空间坐标）
camera.lookAt(mesh.position)

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer()

// 设置渲染器输出的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 执行渲染
renderer.render(scene, camera)

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', () => {
  renderer.render(scene, camera) // 执行渲染操作
})// 监听鼠标、键盘事件

// 点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0)
pointLight.intensity = 10000.0
scene.add(pointLight)

pointLight.position.set(400, 200, 300) 

// // 光源辅助观察
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
// scene.add(pointLightHelper)

onMounted(() => {
  webglRenderContent.value.appendChild(renderer.domElement)
})

</script>
<style lang="less" scoped>
.webgl-render-content{
  width: 100%;
  height: 100%;
}
</style>
