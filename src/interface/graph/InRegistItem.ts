import { Component } from "vue";
import { InDefaultOption } from "./InDefaultOption";
import { AnyBaseModel } from "@/model/basic/AnyBaseModel";

/**
 * 画布组件注册接口
 */
export interface InRegistItem {
  /**
   * 组件名称
   */
  name: string,

  /**
   * 组件自定义节点名称
   */
  nodeShape: string,

  /**
   * 组件初始宽度
   */
  width: number,

  /**
   * 组件初始高度
   */
  height: number,

  /**
   * 组件缩略图
   */
  image: string,

  /**
   * 组件内容
   */
  component: Component,

  /**
   * 组件默认配置
   */
  defaultOption: InDefaultOption,

}