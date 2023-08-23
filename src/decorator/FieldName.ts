
const customFieldNameMetaKey = Symbol("customFieldName");

export function FieldName(customFieldName: string) {
    return function (target: any, key: string) {
    Reflect.defineMetadata(customFieldNameMetaKey, customFieldName, target, key)
  };
}