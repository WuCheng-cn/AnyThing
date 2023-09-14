/**
 * # 文件类型枚举（按扩展名）
 */
export enum EFileExtentionType{
  /**
   * # 图片类型
   */
  Image = 'image/*',

  /**
   * # 视频类型
   */
  Video = 'video/*',

  /**
   * # 音频类型
   */
  Audio = 'audio/*',

  /**
   * # 文档类型
   */
  Document = 'application/pdf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation',

  /**
   * # 表格类型
   */
  Spreadsheet = 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  /**
   * # 演示文稿类型
   */
  Presentation = 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',

  /**
   * # 文本类型
   */
  Text = 'text/plain',

  /**
   * # 压缩包类型
   */
  Archive = 'application/zip,application/x-rar-compressed',

  /**
   * # 未知类型
   */
  Unknown = '*/*'  
}