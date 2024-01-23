import { Ref } from "vue"
import { defineStore } from "pinia"
import { EAppIconSize } from "@/enum/EAppIconSize"
import { InApp } from "@/interface/desktop/InApp"
import SettingIcon from '@/assets/img/appIcon/setting.svg'
import DefaultBackgroundImg from '@/assets/img/MacBg-2k.jpg'
import { AppList } from "@/views/Desktop/appList"

/**
 * # 桌面相关配置
 */
export const DesktopConfig = defineStore('desktopConfig', {
  persist: [
    {
      key: 'desktopConfig',
      storage: localStorage,
      paths: [
        'appIconSize',
        'defaultBackgroundImg',
        'defaultTaskAppList',
        'appList',
      ]
    }
  ],
  state: () => {
    return {
      appIconSize: EAppIconSize.NORMAL,
      defaultBackgroundImg: DefaultBackgroundImg,
      currentBackgroundImg: '',
      defaultTaskAppList: [{
        name: '系统设置',
        icon: SettingIcon,
      }] as InApp[],
      appList: AppList
    }
  },
  getters:{
    appListWithHandler: (state) => {
      return state.appList?.map((item)=>({
       ...item,
        handler:AppList.find((app)=>app.name===item.name)?.handler
      }))
    }
  },
  actions: {
    setDesktopBackgroudImg(src: string, loading: Ref<boolean>) {
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