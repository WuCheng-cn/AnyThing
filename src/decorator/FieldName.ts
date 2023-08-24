
const customFieldNameMetaKey = Symbol("customFieldName");

/**
 * 为字段指定自定义名称
 */
export function FieldName(customFieldName: string) {
    return function (target: any, key: string) {
    Reflect.defineMetadata(customFieldNameMetaKey, customFieldName, target, key)
  };
}