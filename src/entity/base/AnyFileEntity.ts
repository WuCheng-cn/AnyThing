import { Expose } from "class-transformer";
import { InFile } from "@/interface/base/InFile";
import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { EFileUploadStatus } from "@/enum/EFileUploadStatus";
import { FieldName } from "@/decorator/FieldName";

export class AnyFileEntity extends AnyBaseModel implements InFile{
  @FieldName('文件id')
  @Expose()
  id!: string;

  @FieldName('文件名称')
  @Expose()
  name!: string;

  @FieldName('文件资源地址')
  @Expose()
  url!: string;

  @FieldName('源文件')
  @Expose()
  file?: File;

  @FieldName('文件上传状态')
  @Expose()
  status!: EFileUploadStatus;
}