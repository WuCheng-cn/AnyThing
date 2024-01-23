import { InApp } from "@/interface/desktop/InApp";
import AppIconSvg from '@/assets/img/appIcon/anyIcon.svg'
import { AnyDialogHelper } from "@/helper/AnyDialogHelper"
import CodeView from '@/views/CodeView/index.vue'

export const AppList = [
  {
    name: '模板打印',
    icon: AppIconSvg,
  },
  {
    name: '图形引擎',
    icon: AppIconSvg,
  },
  {
    name: '代码编辑器',
    icon: AppIconSvg,
    handler:()=>AnyDialogHelper.showModel(CodeView)
  },
  {
    name: 'GIS引擎',
    icon: AppIconSvg,
  },
] as InApp[];