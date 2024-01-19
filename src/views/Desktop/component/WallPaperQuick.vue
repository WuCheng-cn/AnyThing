<template>
  <ToolBarIconContain class="wallpaper_quick" @click="changeWallpaper">
    <transition name="wallpaper">
      <n-icon v-if="isLoading" class="loading icon" :component="Loader" />
      <n-icon v-else class="icon" :component="Image" />
    </transition>
  </ToolBarIconContain>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Image } from '@vicons/ionicons5'
import { Loader } from '@vicons/tabler'
import { UseWallpaper } from '@/hooks/UseWallpaper'
import { useConfig } from '@/config'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'

const ToolBarIconContain = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/ToolBarIconContain.vue'))

const isLoading = ref(false)

async function changeWallpaper () {
  if (isLoading.value) return
  isLoading.value = true
  const { getRandomWallpaper } = UseWallpaper()
  const res = await getRandomWallpaper()
  useConfig().DesktopConfig.setDesktopBackgroudImg(res, isLoading)
}
</script>
<style lang="less" scoped>
.wallpaper_quick{
  &:hover{
    cursor: pointer;
    background-color: #f2f2f225;
    border-radius: 4px;
  }
  .icon{
    position: absolute;
    top: 2px;
    left: 6px;
    pointer-events: none;
  }
  .loading{
    animation: loading 3s infinite linear;
  }
}
.wallpaper-enter-active,
.wallpaper-leave-active{
  transition: all .5s;
}

.wallpaper-enter-from,
.wallpaper-leave-to{
  opacity: 0;
  transform: scale(0.1);
}
// loading动画
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
