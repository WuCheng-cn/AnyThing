import { ClassConstructor } from "class-transformer";
import { PropType } from "vue";
import { AnBasic } from "./AnBasic";

export function AnFormFieldProps(){
  return {
    modelValue: {
      type: String,
      default: undefined,
    },
    /**
     * # 传入的修饰符
     */
    modelModifiers: {
      type: Object,
      default: () => ({}),
    },
    /**
     * # 传入的实体类
     * 如同时传入了```modifier```或```v-model```指令的```modifier``` 则自动生成兜底的```placeholder```等信息
     */
    entity: {
      type: Function as unknown as PropType<ClassConstructor<AnBasic>>,
      default: undefined,
    },
    /**
     * # 传入的提示占位符
     */
    placeholder: {
      type: String,
      default: undefined,
    },
  }
}

export type  AnFormFieldPropsType = {
  modelValue:string
  modelModifiers:Record<string,boolean>
  entity: AnBasic;
  placeholder:string
}