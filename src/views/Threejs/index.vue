<template>
  <div ref="webglRenderContent" class="webgl-render-content" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'

const webglRenderContent = ref()

// 创建场景
const scene = new THREE.Scene()

// 创建一个长方体几何对象
const geometry = new THREE.BoxGeometry(100, 100, 100)

// 创建一个材质对象（基础材质-不受光照影响）
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff, // 设置材质颜色
  transparent: true, // 开启透明
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
