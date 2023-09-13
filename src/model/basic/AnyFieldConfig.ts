import { InFieldConfig } from "@/interface/base/InFieldConfig";

/**
 * # 字段配置基类
 */
export class AnyFieldConfig implements InFieldConfig {
  key!: string;
  label!: string;
}