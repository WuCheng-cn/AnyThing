import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { Expose, Type } from "class-transformer";


/**
 * 实体基类的基类（超类）
 */
export class AnyEntity extends AnyBaseModel {
   /**
   * # 主键ID
   */
   @Expose() id!: number|string
 
   /**
    * # 实例化一个实体
    * @param id [可选] 实体主键ID
    */
   constructor(id?: number) {
     super()
     if (id) {
       this.id = id
     }
   }
 
   /**
    * # 设置ID
    * @param id ID
    */
   setId(id: number): this {
     this.id = id
     return this
   }
}