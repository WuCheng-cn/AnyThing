import { useConfig } from "@/config";
import { EFormType } from "@/enum/EFormType";
import { InFormFieldConfig } from "@/interface/base/InFormFiledConfig";
import { AnFieldConfig } from "./AnFieldConfig";
const AppConfig = useConfig().AppConfig;
/**
 * # 表单配置实现类
 */
export class AnFormFieldConfig extends AnFieldConfig implements InFormFieldConfig {
  formType?: EFormType = EFormType.TEXT;

  max?: number = AppConfig.max;

  min?: number = AppConfig.min;

  maxLength?: number = AppConfig.maxLength;

  minLength?: number = AppConfig.minLength;

  required?: boolean = false;

  placeholder?: string = '';

  disabled?: boolean = false;

  hidden?: boolean = false;

  defaultValue?: any = '';
  
  trim?: boolean = true;
}