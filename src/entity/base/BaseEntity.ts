import { FieldName } from "@/decorator/FieldName"
import { Expose } from "class-transformer"
import { AnyEntity } from "./AnyEntity"

/**
 * # 实体基类
 */
export class BaseEntity extends AnyEntity {
  [key: string]: any;
  
  @Expose()
  createdId!: number

  @FieldName('创建时间')
  @Expose()
  createdTime!: number

  @FieldName('创建人')
  @Expose()
  createdBy!: string

  @FieldName('备注')
  @Expose()
  remark!: string

  declare updatedBetween: (string | number)[]
}