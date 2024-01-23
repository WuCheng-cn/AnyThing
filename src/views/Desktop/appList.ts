import { InApp } from "@/interface/desktop/InApp";
import AppIconSvg from '@/assets/img/appIcon/anyIcon.svg'
import { AnyDialogHelper } from "@/helper/AnyDialogHelper"
import CodeView from '@/views/CodeView/index.vue'

export const AppList = [
  {
    name: '模板打印',
    icon: AppIconSvg,
    handler:()=>AnyDialogHelper.showMacModel(CodeView)
  },
  {
    name: '图形引擎',
    icon: AppIconSvg,
    handler:()=>AnyDialogHelper.showMacModel(CodeView)
  },
  {
    name: '代码编辑器',
    icon: AppIconSvg,
    handler:()=>AnyDialogHelper.showMacModel(CodeView)
  },
  {
    name: 'GIS引擎',
    icon: AppIconSvg,
    handler:()=>AnyDialogHelper.showMacModel(CodeView)
  },
] as InApp[];