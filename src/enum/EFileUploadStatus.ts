/**
 * 文件上传状态枚举
 */
export enum EFileUploadStatus {
  Pending = 'pending',
  Uploading = 'uploading',
  Error = 'error',
  Finished = 'finished',
  Removed = 'removed',
}