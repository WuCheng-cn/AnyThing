export interface InFileChunk {
  /**
   * 文件切片
   */
  blob: Blob

  /**
   * 文件切片开始位置
   */
  start: number

  /**
   * 文件切片结束位置
   */
  end: number

  /**
   * 文件切片索引
   */
  index: number

  /**
   * 文件切片hash(用于判别是否上传过)
   */
  hash: string
}
