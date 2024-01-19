import { EAppIconSize } from "@/enum/EAppIconSize"
import { defineStore } from "pinia"
import { Ref } from "vue"
import DefaultBackgroundImg from '@/assets/img/MacBg-2k.jpg' 
/**
 * # 桌面相关配置
 */
export const DesktopConfig = defineStore('desktopConfig', {
  persist:[
    {
      key:'desktopConfig',
      storage:localStorage,
      paths:['appIconSize','defaultBackgroundImg']
    }
  ],
  state: () => {
    return {
      appIconSize: EAppIconSize.NORMAL,
      defaultBackgroundImg: DefaultBackgroundImg,
      currentBackgroundImg: '',
    }
  },
  actions:{
    setDesktopBackgroudImg(src:string,loading:Ref<boolean>){
      loading.value = true
      const image = new Image()
      image.src = src
      image.onload = () => {
        loading.value = false
        this.currentBackgroundImg = src
      }
      image.onerror = () => {
        loading.value = false
      }
    }
  }
})