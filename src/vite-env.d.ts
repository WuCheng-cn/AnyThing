/// <reference types="vite/client" />
export {}
declare global {  //设置全局属性
  interface Window {  //window对象属性
    luckysheet: any;   //加入对象
  }
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}