<template>
  <div id="cesium-viewer" ref="viewerDivRef" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TileMapServiceImageryProvider, Viewer, buildModuleUrl } from 'cesium'
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

const viewerDivRef = ref<HTMLDivElement>()
window.CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/'

onMounted(() => {
  new Viewer(viewerDivRef.value as HTMLElement, {
    imageryProvider: new TileMapServiceImageryProvider({
      url: 'node_modules/cesium/Build/CesiumUnminified/Assets/Textures/NaturalEarthII',
    }),
  })
})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
}
</style>
