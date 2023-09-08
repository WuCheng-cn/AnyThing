import { EFormType } from "@/enum/EFormType";
import { InFieldConfig } from "./InFieldConfig";

export interface InFormFieldConfig extends InFieldConfig{
  formType?: EFormType;
  label?: string;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
  trim?: boolean;
}