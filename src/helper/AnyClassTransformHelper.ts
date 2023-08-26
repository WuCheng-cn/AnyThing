import { AnBasic } from "@/model/basic/AnBasic";
import { plainToInstance } from "class-transformer";
import { ClassConstructor,TargetMap } from "class-transformer/types/interfaces";
/**
 * 类型转换帮助类
 */
export class AnyClassTransformHelper {
  /**
   * 将一个对象转换为指定类型的对象
   * @param from 源对象
   * @param to 目标类型
   * @param targetMaps 目标类型的属性映射
   * @returns 转换后的对象
   */
  static parse<T>(from: Record<string, any>, to: ClassConstructor<T>, ...targetMaps: TargetMap[]): T {
    return plainToInstance(to, from, {
      // Expose/Exclude策略转换
      excludeExtraneousValues: true,
      // 自动隐式类型转换
      enableImplicitConversion: true,
      // 输出未匹配且含有默认值的字段
      exposeDefaultValues: true,
      // 输出undefined的字段
      exposeUnsetFields: true,
      // 关联对象自动转换
      enableCircularCheck: true,
      targetMaps,
    })
  }

  /**
   * 将一个对象转换为指定类型的对象数组
   * @param from 源对象
   * @param to 目标类型
   * @param targetMaps 目标类型的属性映射
   * @returns 转换后的对象数组
   * @description 该方法是对parse方法的封装，用于转换对象数组
   */
  static parseArray<T>(from: Record<string, any>, to: ClassConstructor<T>, ...targetMaps: TargetMap[]): T[] {
    const list: T[] = this.parse(from, to, targetMaps as unknown as TargetMap) as unknown as T[]
    return list
  }


  static copy<F extends AnBasic, T extends AnBasic>(from: F, to: ClassConstructor<T>): T {
    return this.parse(from.toSource(), to)
  }
}
