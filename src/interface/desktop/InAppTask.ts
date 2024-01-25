import { InApp } from "./InApp";

export interface InAppTask {
  /**
   * # 任务关联应用
   */
  app: InApp;

  /**
   * # 任务对应的窗口dom
   */
  modelDom: HTMLElement;

  /**
   * # 任务在任务栏对应的dom
   */
  taskBarDom: HTMLElement;

  /**
   * # 任务是否激活
   */
  isActive: boolean;

  /**
   * # 任务是否最小化
   */
  isMinimize: boolean;
  
}