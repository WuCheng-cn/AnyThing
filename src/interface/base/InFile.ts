import { EFileUploadStatus } from "@/enum/EFileUploadStatus"
import { FileInfo } from "naive-ui/es/upload/src/interface"

export interface InFile extends FileInfo {
  id:string
  name:string
  url:string
  file?:File
  status:EFileUploadStatus
  percentage?: number | null;
}