import { AsyncComponentLoader } from "vue";
import { EFormType } from "@/enum/EFormType";
import { InFieldConfig } from "./InFieldConfig";
import { EDateFormType } from "@/enum/EDateFormType";
import { InRecord } from "./InRecord";

export interface InFormFieldConfig extends InFieldConfig{
  formType?: EFormType;
  dateType?:EDateFormType;
  label?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  hidden?: boolean;
  defaultValue?: any;
  trim?: boolean;
  emumRecord?: InRecord[];
  checkedValue?: any;
  unCheckedValue?: any;
  component?: AsyncComponentLoader;
}