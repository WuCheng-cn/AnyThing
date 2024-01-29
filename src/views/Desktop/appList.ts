import { AppEntity } from "@/entity/desktop/AppEntity";
import { UseNormalApp } from "./hooks/UseNormalApp";
import { AnyComponentHelper } from "@/helper/AnyComponentHelper";
import AppIcon from '@/assets/img/appIcon/anyIcon.svg'
import CloudMusicIcon from '@/assets/img/appIcon/wwyIcon.svg'
import SettingIcon from '@/assets/img/appIcon/setting.svg'

const CodeView = AnyComponentHelper.asyncComponent(() => import('@/views/CodeView/index.vue'))
const TempPrint = AnyComponentHelper.asyncComponent(() => import('@/views/TempPrint/index.vue'))
const GraphicsEngine = AnyComponentHelper.asyncComponent(() => import('@/views/GraphicsEngine/index.vue'))
const GIS = AnyComponentHelper.asyncComponent(() => import('@/views/GIS/Cesium/index.vue'))
const CloudMusic = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/CloudApp/CloudMusic.vue'))
const Setting = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/LocalApp/Setting/index.vue'))

const { handler } = UseNormalApp()

export const AppList = [
  new AppEntity().assign({
    name: '模板打印',
    icon: AppIcon,
    handler: handler(TempPrint,{}, { title: '模板打印' })
  }),
  new AppEntity().assign({
    name: '图形引擎',
    icon: AppIcon,
    handler: handler(GraphicsEngine,{}, { title: '图形引擎' })
  }),
  new AppEntity().assign({
    name: '代码编辑器',
    icon: AppIcon,
    handler: handler(CodeView,{}, { title: '代码编辑器' })
  }),
  new AppEntity().assign({
    name: 'GIS引擎',
    icon: AppIcon,
    handler: handler(GIS,{}, { title: 'GIS引擎' })
  }),
  new AppEntity().assign({
    name: '网易云音乐',
    icon: CloudMusicIcon,
    handler: handler(CloudMusic,{}, { title: '网易云音乐' })
  }),
];

export const DefaultTaskAppList = [
  new AppEntity().assign({
    name: '系统设置',
    icon: SettingIcon,
    handler: handler(Setting,{}, { title: '系统设置' })
  }),
]