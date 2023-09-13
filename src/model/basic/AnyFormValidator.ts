import { AnyValidatorHelper } from "@/helper/AnyValidatorHelper"

/**
 * # 表单验证器
 * @description 用于创建表单验证规则
 */
export class AnyFormValidator {
  /**
   * 错误提示信息
   */
  private message: string = ''

  /**
   * 是否必填
   */
  private required: boolean = false

  /**
   * 触发条件
   */
  private trigger: string = 'change'

  /**
   * 异步验证器
   */
  private validator: Function = (rule:any,value:string) => Promise<void>

  
  /**
   * # 设置错误提示消息
   */
  setMessage(message:string){
    this.message = message
    return this
  }

  /**
   * # 为空时报错
   */
  ifEmpty(){
    this.required = true
    if(!this.message){
      this.message = '除却巫山不是云，看我一眼行不行'
    }
    return this
  }
  
  /**
   * # 大于某个值时报错
   */
  ifGreaterThan(param:number){
    this.message = `众数尺寸不宜细，最少只能填${param}`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(Number(value) > param){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 小于某个值时报错
   */
  ifLessThan(param:number){
    this.message =`众数尺寸不宜细，最少只能填${param}`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(Number(value) < param){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 长度大于某个值时报错
   */
  ifLongerThan(param:number){
    this.message = `再长就不礼貌了，最多只能填${param}个字`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(value.length > param){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 长度小于某个值时报错
   */
  ifShorterThan(param:number){
    this.message = `再短就不礼貌了，最少只能填${param}个字`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(value.length < param){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }
  
  /**
   * # 长度不等于某个值时报错
   */
  ifNotEqual(param:number){
    this.message = `合适的才是最好的，只能填${param}个字`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(value.length === param){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是数字（含小数、负数、0）时报错
   */
  ifNotNumber(){
    this.message = `这不是数字吧？`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isNumber(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是小数（含负数）时报错
   */
  ifNotDecimal(){
    this.message = `这不是小数吧？`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isDecimal(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是整数（含负数、0）时报错
   */
  ifNotInteger(){
    this.message = `这不是整数吧？`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isInteger(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是自然整数时报错
   */
  ifNotNaturalInteger(){
    this.message = `这不是自然整数吧？`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isNaturalInteger(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是自然数时报错
   */
  ifNotNaturalNumber(){
    this.message = `这不是自然数吧？`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isNaturalNumber(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是中文时报错
   */
  ifNotChinese(){
    this.message = `在你的世界学你说ABCD，在我的土地对不起请说华语`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isChinese(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是英文时报错
   */
  ifNotEnglish(){
    this.message = `来点英文吧，不然我不认识你了`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isEnglish(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是IP时报错（含IPV6）
   */
  ifNotIp(){
    this.message = `IP地址长这样吗？`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isIp(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是手机号时报错
   */
  ifNotMobile(){
    this.message = `手机号长这样吗，我读书少你别骗我`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isMobile(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是邮箱时报错
   */
  ifNotEmail(){
    this.message = `邮箱长这样吗，我读书少你别骗我`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isEmail(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是身份证号时报错
   */
  ifNotIdCard(){
    this.message = `身份证号长这样吗，我读书少你别骗我`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isIdCard(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不是URL时报错
   */
  ifNotUrl(){
    this.message = `URL长这样吗，我读书少你别骗我`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(AnyValidatorHelper.isUrl(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 不满足正则表达式时报错
   */
  ifNotMatch(reg:RegExp){
    this.message = `不符合正则表达式，我读书少你别骗我`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(reg.test(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }

  /**
   * # 满足正则表达式时报错
   */
  ifMatch(reg:RegExp){
    this.message = `符合正则表达式，我读书少你别骗我`
    this.validator = (rule:any,value:string) => {
      return new Promise<void>((resolve,reject)=>{
        if(!reg.test(value)){
          resolve()
        }else{
          reject(Error(this.message))
        }
      })
    }
    return this
  }
}