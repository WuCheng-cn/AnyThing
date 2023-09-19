import { Component } from "vue";

/**
 * 画布组件注册接口
 */
export interface InRegistItem{
  /**
   * 组件名称
   */ 
  name:string,

  /**
   * 组件自定义节点名称
   */ 
  nodeShape:string,

  /**
   * 组件初始宽度
   */ 
  width:number,

  /**
   * 组件初始高度
   */
  height:number,

  /**
   * 是否作为可嵌套父级组件
   */
  isParent:boolean,

  /**
   * 组件内容
   */
  component:Component,

  /**
   * 组件默认配置
   */
  defaultOption:any,
}