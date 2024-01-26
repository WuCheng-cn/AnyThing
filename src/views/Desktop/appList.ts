import { AppEntity } from "@/entity/desktop/AppEntity";
import AppIconSvg from '@/assets/img/appIcon/anyIcon.svg'
import { UseNormalApp } from "./hooks/UseNormalApp";
import { AnyComponentHelper } from "@/helper/AnyComponentHelper";

const CodeView = AnyComponentHelper.asyncComponent(()=>import('@/views/CodeView/index.vue'))
const TempPrint = AnyComponentHelper.asyncComponent(()=>import('@/views/TempPrint/index.vue'))
const GraphicsEngine = AnyComponentHelper.asyncComponent(()=>import('@/views/GraphicsEngine/index.vue'))
const GIS = AnyComponentHelper.asyncComponent(()=>import('@/views/GIS/Cesium/index.vue'))


const {handler} = UseNormalApp()

export const AppList = [
  new AppEntity().assign({
    name: '模板打印',
    icon: AppIconSvg,
    handler:handler(TempPrint)
  }),
  new AppEntity().assign({
    name: '图形引擎',
    icon: AppIconSvg,
    handler:handler(GraphicsEngine)
  }),
  new AppEntity().assign({
    name: '代码编辑器',
    icon: AppIconSvg,
    handler:handler(CodeView)
  }),
  new AppEntity().assign({
    name: 'GIS引擎',
    icon: AppIconSvg,
    handler:handler(GIS)
  }),
];