import { Component } from "vue";

/**
 * 画布组件注册接口
 */
export interface RegistItem{
  /**
   * 组件名称
   */ 
  name:string,
  /**
   * 组件自定义节点名称
   */ 
  nodeShape:string,
  /**
   * 组件内容
   */
  component:Component,
  /**
   * 组件默认配置
   */
  defaultOption:any,
}