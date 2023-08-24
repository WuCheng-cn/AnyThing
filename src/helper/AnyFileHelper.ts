import { AppConfig } from '../AppConfig'

/**
 * 文件助手类
 * @author Hamm
 */
export abstract class AnyFileHelper {

  /**
   * 以文本形式读取文件（二进制文件除外）
   * @param file 文件
   * @returns 文件内容
   * @throws {Error} 文件读取失败
   * @throws {Error} 文件类型不支持
   * @throws {Error} 文件大小超过限制
   * @throws {Error} 文件为空
   */
  static async readFileAsText(file: File): Promise<string> {
    if (!file) {
      throw new Error('文件为空')
    }
    if (file.size > AppConfig.maxFileSize) {
      throw new Error('文件大小超过限制')
    }
    // 二进制文件不支持
    if (file.type.includes('image') || file.type.includes('audio') || file.type.includes('video')) {
      throw new Error('文件类型不支持')
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }
      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsText(file)
    })
  }

  /**
   * 字节数转可读文件大小
   * @param size 字节数
   * @param fractionDigits 小数位数
   * @returns
   */
  static getFileSizeFriendly(size: number, fractionDigits = 2): string {
    const partSize = 1024
    const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let res = ''
    for (let i = 0; i < unitArr.length; i += 1) {
      if (size < partSize ** (i + 1)) {
        res = `${(size / (partSize ** i)).toFixed(fractionDigits)}${unitArr[i]}`
        break
      }
      res = 'LARGE FILE'
    }
    return res
  }

  /**
   * 获取静态文件的绝对地址
   * @param url 地址
   * @returns 绝对地址
   */
  static getStaticFileUrl(url: string): string {
    if (!url) {
      return ''
    }
    if (url.includes('https://') || url.includes('http://')) {
      return url
    }
    return AppConfig.staticUrl + url
  }
}
