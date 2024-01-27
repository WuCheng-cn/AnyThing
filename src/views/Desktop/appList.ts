import { AppEntity } from "@/entity/desktop/AppEntity";
import { UseNormalApp } from "./hooks/UseNormalApp";
import { AnyComponentHelper } from "@/helper/AnyComponentHelper";
import AppIcon from '@/assets/img/appIcon/anyIcon.svg'
import CloudMusicIcon from '@/assets/img/appIcon/wwyIcon.svg'

const CodeView = AnyComponentHelper.asyncComponent(()=>import('@/views/CodeView/index.vue'))
const TempPrint = AnyComponentHelper.asyncComponent(()=>import('@/views/TempPrint/index.vue'))
const GraphicsEngine = AnyComponentHelper.asyncComponent(()=>import('@/views/GraphicsEngine/index.vue'))
const GIS = AnyComponentHelper.asyncComponent(()=>import('@/views/GIS/Cesium/index.vue'))
const CloudMusic = AnyComponentHelper.asyncComponent(()=>import('@/views/Desktop/CloudApp/CloudMusic.vue'))

const {handler} = UseNormalApp()

export const AppList = [
  new AppEntity().assign({
    name: '模板打印',
    icon: AppIcon,
    handler:handler(TempPrint)
  }),
  new AppEntity().assign({
    name: '图形引擎',
    icon: AppIcon,
    handler:handler(GraphicsEngine)
  }),
  new AppEntity().assign({
    name: '代码编辑器',
    icon: AppIcon,
    handler:handler(CodeView)
  }),
  new AppEntity().assign({
    name: 'GIS引擎',
    icon: AppIcon,
    handler:handler(GIS)
  }),
  new AppEntity().assign({
    name: '网易云音乐',
    icon: CloudMusicIcon,
    handler:handler(CloudMusic)
  }),
];