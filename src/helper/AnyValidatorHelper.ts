/**
 * # 基础验证助手类
 */
export class AnyValidatorHelper {
  /**
   * # 验证是否为手机号
   * @param value 
   */
  public static isMobile(value: string): boolean {
    return /^1[3456789]\d{9}$/.test(value)
  }

  /**
   * # 验证是否为邮箱
   * @param value 
   */
  public static isEmail(value: string): boolean {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
  }
  
  /**
   * # 验证是否为合法身份证号
   * @param value 
   */
  public static isIdCard(value: string): boolean {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  }

  /**
   * # 验证是否为URL
   * @param value 
   */
  public static isUrl(value: string): boolean {
    return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(value)
  }

  /**
   * # 验证是否为IP（含IPV6）
   * @param value 
   */
  public static isIp(value: string): boolean {
    return /^((([1-9]?\d)|(1\d{2})|(2[0-5]{2}))\.){3}(([1-9]?\d)|(1\d{2})|(2[0-5]{2}))$/.test(value)
  }

  /**
   * # 验证是否为数字（含小数、负数、0）
   * @param value 
   */
  public static isNumber(value: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(value)
  }

  /**
   * # 验证是否为小数（含负数）
   * @param value 
   */
  public static isDecimal(value: string): boolean {
    return /^-?\d+\.\d+$/.test(value)
  }

  /**
   * # 验证是否为整数（含负数、0）
   * @param value 
   */
  public static isInteger(value: string): boolean {
    return /^-?\d+$/.test(value)
  }

  /**
   * # 验证是否为自然整数
   * @param value 
   */
  public static isNaturalInteger(value: string): boolean {
    return /^[1-9]\d*$/.test(value)
  }
  /**
   * # 验证是否为自然数
   * @param value 
   */
  public static isNaturalNumber(value: string): boolean {
    return /^\d+$/.test(value)
  }

  /**
   * # 验证是否为中文
   * @param value 
   */
  public static isChinese(value: string): boolean {
    return /^[\u4e00-\u9fa5]+$/.test(value)
  }

  /**
   * # 验证是否为英文
   * @param value 
   */
  public static isEnglish(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value)
  }

  /**
   * # 验证是否满足正则表达式
   * @param value 
   */
  public static isMatch(value: string, regExp: RegExp): boolean {
    return regExp.test(value)
  }

}
  
