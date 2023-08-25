import { Basic } from "@/model/basic/Basic";

const customFieldNameMetaKey = Symbol("customFieldName");

/**
 * 为字段指定自定义名称
 */
export function FieldName(customFieldName: string) {
    return function (target: any, key: string) {
    Reflect.defineMetadata(customFieldNameMetaKey, customFieldName, target, key)
  };
}

/**
 * 获取字段的自定义名称
 * @param target 实体
 * @param fieldKey 字段名
 * @returns 字段的自定义名称
 * @description 该方法用于获取字段的自定义名称，如果字段没有自定义名称，则返回字段名
 */
export function getFieldName<E extends Basic>(target: E, fieldKey: string): string {
  let fieldName = Reflect.getOwnMetadata(customFieldNameMetaKey, target, fieldKey)
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === Basic.name) {
    return fieldKey
  }
  fieldName = getFieldName(superClass, fieldKey)
  return fieldName
}