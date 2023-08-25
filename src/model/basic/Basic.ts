
import { getFieldName } from '@/decorator/FieldName'
import { AnyClassTransformHelper } from '@/helper/AnyClassTransformHelper'
import { instanceToPlain } from 'class-transformer'
/**
 * 模型基类（最基础的模型操作）
 */
export class Basic {
  /**
   * 创建一个当前类型的实例
   * @returns 当前类型的实例
   * @description 该方法是对new操作符的封装，用于创建当前类型的实例
   */
  static newInstance<T extends Basic>(): T {
    return new (this as any)()
  }

  /**
  * 获取属性的可阅读名字
  * @param fieldKey 属性名
  * @returns 属性的可读名字
  * 可使用 @FieldName 装饰器修饰 如无修饰 则直接返回属性名
  */
  static getCustomFieldName(fieldKey: string): string {
    return getFieldName(this.newInstance(), fieldKey)
  }

  /**
   * 将实体转为字面量对象
   * @returns 字面量对象
   */
  toAliasObject(): Record<string, any> {
    return instanceToPlain(this)
  }

  /**
   * 将实体按别名转换为JSON字符串
   * @returns JSON字符串
   * @description 该方法将实体按别名转换为JSON字符串
   * @description 如果要直接将实体转换为JSON字符串，请使用toString方法 @see toNormalString
   */
  toAliasString(): string {
    return JSON.stringify(this.toAliasObject())
  }

  /**
   * 将实体转换为JSON字符串
   * @returns JSON字符串
   * @description 该方法不会按别名转换，而是直接将实体转换为JSON字符串 
   * @description 如果要按别名转换，请使用toAliasString方法 @see toAliasString
   */
  toNormalString(): string {
    return JSON.stringify(this)
  }

  /**
   * 将与实体字段名一致的普通JSON对象合并到实体上
   * @param obj 普通JSON对象
   * @returns 实体
   * @description 该方法是对Object.assign方法的封装，用于将普通JSON对象合并到实体上
   */
  assign(obj: Record<string, unknown>): this {
    return Object.assign(this, obj)
  }

  /**
   * 复制当前实体到一个新的实体
   * @returns 新的实体
   */
  copy(): this {
    return AnyClassTransformHelper.copy(this, (this as any).constructor)
  }

  /**
   * 暴露部分类的字段
   * @param fields 暴露字段名列表
   * @returns 实体
   * @description 该方法用于暴露部分类的字段，将不在暴露列表中的字段置为undefined
   */
  expose(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (!fields.includes(field)) {
        (this as any)[field] = undefined
      }
    }
    return this
  }

  /**
   * 排除部分类的字段
   * @param fields 排除字段名列表
   * @returns 实体
   * @description 该方法用于排除部分类的字段，将在排除列表中的字段置为undefined
   * @description 该方法与expose方法相反
   */
  exclude(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (fields.includes(field)) {
        (this as any)[field] = undefined
      }
    }
    return this
  }

}