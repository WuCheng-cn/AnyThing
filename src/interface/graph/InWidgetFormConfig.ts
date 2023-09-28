import { PropType } from "vue";
import { EWigetFormConfigType } from "@/enum/EWigetFormConfigType";
import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { AsyncComponentLoader } from "vue";

/**
 * 画布配置表单接口
 */
export interface InWidgetFormConfig {
  /**
   * 表单名称
   */
  title: string;

  /**
   * 是否禁用
   */
  disabled: boolean;

  /**
   * 表单类型
   */
  type: EWigetFormConfigType;

  /**
   * 表单实体
   */
  entity: PropType<AnyBaseModel>;

  /**
   * 表单组件
   */
  component: AsyncComponentLoader;

  /**
   * 表单数据
   */
  data: AnyBaseModel;
}