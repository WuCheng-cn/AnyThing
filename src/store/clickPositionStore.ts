import { defineStore } from "pinia"
import { Ref, ref } from "vue"
interface MousePosition {
  x: number;
  y: number;
}
/**
 * # 点击位置数据中心
 */
export const clickPositionStore = defineStore('clickPositionStore', {
  persist: true,
  state: () => {
    return {
      clickedPosition:null as MousePosition | null
    }
  },
  actions:{
   setClickedPosition(data:MousePosition | null){
      this.clickedPosition = data
    }
  }
})