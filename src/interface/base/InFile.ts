import { EFileUploadStatus } from "@/enum/EFileUploadStatus"
import { FileInfo } from "naive-ui/es/upload/src/interface"

export interface InFile extends FileInfo {
  id:string
  name:string
  url:string
  status:EFileUploadStatus
  percentage?: number | null;
}