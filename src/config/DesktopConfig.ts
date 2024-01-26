import { Ref } from "vue"
import { defineStore } from "pinia"
import { EAppIconSize } from "@/enum/EAppIconSize"
import { InApp } from "@/interface/desktop/InApp"
import SettingIcon from '@/assets/img/appIcon/setting.svg'
import DefaultBackgroundImg from '@/assets/img/MacBg-2k.jpg'
import { AppList } from "@/views/Desktop/appList"
import { InAppTask } from "@/interface/desktop/InAppTask"
import { AppTaskEntity } from "@/entity/desktop/AppTaskEntity"
import { AppEntity } from "@/entity/desktop/AppEntity"

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
      appTaskList: [] as AppTaskEntity[],
      appList: AppList,
      currentApp: null as AppEntity | null,
    }
  },
  getters: {
    appListWithHandler: (state) => {
      return state.appList?.map((item) => {
        const handler = AppList.find((app) => app.name === item.name)?.handler
        if (handler) {
          item.handler = handler
        }
        return new AppEntity().assign(item)
      })
    },
    appListInTaskList: (state) => {
      // 从appList中获取在任务栏中的app
      return state.appList?.filter((item) => {
        return state.appTaskList.some((task) => task.app.name === item.name)
      })
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