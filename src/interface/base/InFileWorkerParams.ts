export interface InFileWorkerParams {
  /**
   * 文件
   */
  file: File

  /**
   * 分片大小
   */
  chunkSize: number

  /**
   * 当前分片索引
   */
  startChunkIndex: number

  /**
   * 结束分片索引
   */
  endChunkIndex: number
}
