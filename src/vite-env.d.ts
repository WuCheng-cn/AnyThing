/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />
export {}
declare global {  //设置全局属性
  interface Window {  //window对象属性
    luckysheet: any;   //加入对象
    __x6_instances__: any;//x6实例
    MonacoEnvironment: any;//monaco实例
    showOpenFilePicker: any;//打开文件
  }
}
