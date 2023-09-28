import Amelia from '@/assets/img/widgetImage/Amelia.gif'
import { InRegistItem } from "@/interface/graph/InRegistItem";
import { AnyComponentHelper } from "@/helper/AnyComponentHelper";
import { InWidgetFormConfig } from "@/interface/graph/InWidgetFormConfig";
import { WidgetBaseConfig } from '../../config/WidgetBaseConfig';

const formConfig: InWidgetFormConfig[] = [
  WidgetBaseConfig,
]

const regist: InRegistItem = {
  name: 'WidgetImage',
  nodeShape: 'widgetImage',
  width: 200,
  height: 200,
  image: Amelia,
  component: AnyComponentHelper.asyncComponent(() => import('./index.vue')),
  defaultOption: {
    formConfig: formConfig,
  },
}

WidgetBaseConfig.data.assign(regist as unknown as Record<string, unknown>)


export default regist