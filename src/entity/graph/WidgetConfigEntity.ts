import { FieldName } from "@/decorator/FieldName";
import { FormFieldConfig } from "@/decorator/FormFieldConfig";
import { EFormType } from "@/enum/EFormType";
import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { Expose } from "class-transformer";

/**
 * 画布组件基础配置实体类
 */
export class WidgetConfigEntity extends AnyBaseModel {
  @FieldName('组件名称')
  @FormFieldConfig()
  @Expose()
  name!: string;

  @FieldName('组件宽度')
  @FormFieldConfig()
  @Expose()
  width: number = 200;

  @FieldName('组件高度')
  @FormFieldConfig({
    formType: EFormType.TEXT,
  })
  @Expose()
  height: number = 200;

  setWidth(width: number) {
    this.width = width
    return this
  }

  setHeight(height: number) {
    this.height = height
    return this
  }
}