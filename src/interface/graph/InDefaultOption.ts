import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { InWidgetFormConfig } from "./InWidgetFormConfig";

export interface InDefaultOption {
  /**
   * 是否作为可嵌套父级组件
   */
  isParent?: boolean

  /**
 * 组件表单配置
 */
  formConfig: InWidgetFormConfig[],
}