import { useConfig } from "@/config";
import { EFormType } from "@/enum/EFormType";
import { InFormFieldConfig } from "@/interface/base/InFormFiledConfig";
import { AnyFieldConfig } from "./AnyFieldConfig";
import { EDateFormType } from "@/enum/EDateFormType";
import { InRecord } from "@/interface/base/InRecord";

/**
 * # 表单配置实现类
 */
export class AnyFormFieldConfig extends AnyFieldConfig implements InFormFieldConfig {
  /**
   * # 表单类型
   * @description 该字段将会被渲染为什么类型的表单
   */ 
  formType: EFormType = EFormType.TEXT;

  /**
   * # 日期类型
   * @description 仅在```type```为```date```时生效
   * @description 该字段将会被渲染为什么类型的日期表单
   */
  dateType?: EDateFormType = EDateFormType.DATE;

  /**
   * # 最大长度
   * @description 仅在```type```为```text ， textarea```时生效
   */
  maxLength?: number = 16;

  /**
   * # 最小长度
   * @description 仅在```type```为```text ， textarea```时生效
   */
  minLength?: number = 0;

  /**
   * # 是否必填/必选
   */
  required?: boolean = false;

  /**
   * # 提示占位符
   */
  placeholder?: string = '';

  /**
   * # 是否禁用
   */
  disabled?: boolean = false;

  /**
   * # 是否可清空
   */
  clearable?: boolean = true;

  /**
   * # 是否隐藏
   */
  hidden?: boolean = false;

  /**
   * # 默认值
   */
  defaultValue?: any = '';

  /**
   * # 是否去除首尾空格
   * @description 仅在```type```为```text ， textarea```时生效
   */
  trim?: boolean = true;

  /**
   * # 枚举常量
   * @description 仅在```type```为```select,radio,checkbox```时生效
   */
  emumRecord?: InRecord[] = [];

  /**
   * # 选中时的值
   * @description 仅在```type```为```switch```时生效
   */
  checkedValue?: any = true;

  /**
   * # 未选中时的值
   * @description 仅在```type```为```switch```时生效
   */
  unCheckedValue?: any = false;
}