import { AppEntity } from "@/entity/desktop/AppEntity";

export interface InApp {
  /**
   * # 应用名称
   */
  name: string;

  /**
   * # 应用图标
   */
  icon: string;

  /**
   * # 应用描述
   */
  description?: string;

  /**
   * # 应用处理器
   */
  handler?: (app:AppEntity,isTaskApp:boolean) => void;

  /**
   * # 应用在桌面对应的dom
   */
  dom?: HTMLElement;
}