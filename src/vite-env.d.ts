/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

import { Environment } from "monaco-editor";
// 为了 ts 能提示 import.meta.env.MODE
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare global {  //设置全局属性
  interface Window {  //window对象属性
    luckysheet: any;   //加入对象
    __x6_instances__: any;//x6实例
    MonacoEnvironment?: Environment | undefined ;//monaco实例
    showOpenFilePicker: any;//打开文件
    CESIUM_BASE_URL: string;//cesium基准地址
  }
}
export {}
