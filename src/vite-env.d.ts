/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />
export {}
declare global {  //设置全局属性
  interface Window {  //window对象属性
    luckysheet: any;   //加入对象
  }
}
