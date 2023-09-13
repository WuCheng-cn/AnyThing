import { InFormFieldConfig } from "@/interface/base/InFormFiledConfig";
import { AnBasic } from "@/model/basic/AnBasic";
import { AnFormFieldConfig } from "@/model/basic/AnFormFieldConfig";
import { getFieldName } from "./FieldName";

const customFormFieldConfigName = Symbol('customFormFieldConfigName');
const customFormFieldConfigListName = Symbol('customFormFieldConfigListName');

/**
 * 为字段指定自定义表单配置
 * @param customFormFieldConfig 自定义表单配置
 * @description 该装饰器用于为字段指定自定义表单配置
 */
  export function FormFieldConfig<E extends AnBasic>(customFormFieldConfig: InFormFieldConfig) {
    return function (target: any, key: string) {
      if (!customFormFieldConfig) {
        customFormFieldConfig = new AnFormFieldConfig();
      }
      const formFieldList = Reflect.getOwnMetadata(customFormFieldConfigListName, target) || []
      formFieldList.push(key)
      Reflect.defineMetadata(customFormFieldConfigName, customFormFieldConfig, target, key)
      Reflect.defineMetadata(customFormFieldConfigListName, formFieldList, target)
    };
  }

/**
 * 获取字段的自定义表单配置
 * @param target 实体
 * @param fieldKey 字段名
 * @returns 字段的自定义表单配置
 * @description 该方法用于获取字段的自定义表单配置，如果字段没有自定义表单配置，则返回null
 */
export function getFormFieldConfig<E extends AnBasic>(target: E, fieldKey: string): AnFormFieldConfig | null {
  let formFieldConfig = Reflect.getOwnMetadata(customFormFieldConfigName, target, fieldKey)
  //当前实例没有自定义表单配置，从父类获取
  if (!formFieldConfig) {
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === AnBasic.name) {
      return null
    }
    formFieldConfig = getFormFieldConfig(superClass, fieldKey)
  }
  // 如果一直到AnBasic也没有自定义表单配置，则返回null
  if (!formFieldConfig) {
    return null
  }
  // 如果字段未绑定label，则使用字段的元数据的 FieldName 作为label
  if (!formFieldConfig.label) {
    formFieldConfig.label = getFieldName(target, fieldKey)
  }
  // 将自定义配置中的属性覆盖到默认配置中并返回
  const defaultFormFieldConfig = new AnFormFieldConfig()
  formFieldConfig = Object.assign(defaultFormFieldConfig, formFieldConfig)
  return formFieldConfig
}
 
/**
 * 获取实体的所有自定义表单配置
 * @param target 实体
 * @returns 实体的所有自定义表单配置
 * @description 该方法用于获取实体的所有自定义表单配置
 */
export function getFormFieldConfigList<E extends AnBasic>(target: E): AnFormFieldConfig[] {
  const formFieldList = Reflect.getOwnMetadata(customFormFieldConfigListName, target) || []
  const formFieldConfigList: AnFormFieldConfig[] = []
  for (const fieldKey of formFieldList) {
    const formFieldConfig = getFormFieldConfig(target, fieldKey)
    if (formFieldConfig) {
      formFieldConfigList.push(formFieldConfig)
    }
  }
  return formFieldConfigList
}

/**
 * 获取标记了表单配置的字段列表（含所有父类的）
 * @param target 实体
 * @returns 标记了表单配置的字段列表
 * @description 该方法用于获取标记了表单配置的字段列表
 */
export function getFormFieldList<E extends AnBasic>(target: E): string[] {
  const formFieldList = Reflect.getOwnMetadata(customFormFieldConfigListName, target) || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === AnBasic.name) {
    return formFieldList
  }
  const superFormFieldList = getFormFieldList(superClass)
  return superFormFieldList.concat(formFieldList)
}