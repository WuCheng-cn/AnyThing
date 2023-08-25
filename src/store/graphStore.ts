import { defineStore } from "pinia"
import { nextTick } from "vue";

/**
 * # 画布数据中心
 */
export const graphStore = defineStore('graphStore', {
  persist: true,
  state: () => {
    return {
      recordsCenter:{} as Record<string,any>
    }
  },
  actions:{
    /**
     * 存储画布组件数据
     * @param key 唯一标识
     * @param data 数据
     */
    setRecord(key:string,data:Record<string,any>){
      console.log('setRecord',key,data);
      
      this.recordsCenter[key] = data
      nextTick(()=>{
        console.log('this.recordsCenter',this.recordsCenter);
      }
      )
    },

    /**
     * 获取画布组件数据
     * @param key 唯一标识
     * @returns
     */
    getRecord(key:string){
      return this.recordsCenter[key]
    },

    /**
     * 删除画布组件数据
     * @param key 唯一标识
     */ 
    deleteRecord(key:string){
      delete this.recordsCenter[key]
    }
  }
})