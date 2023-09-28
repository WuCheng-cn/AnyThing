import { InRegistItem } from "@/interface/graph/InRegistItem";
import { AnyComponentHelper } from "@/helper/AnyComponentHelper";
import { InWidgetFormConfig } from "@/interface/graph/InWidgetFormConfig";
import { WidgetBaseConfig } from "@/views/GraphicsEngine/config/WidgetBaseConfig";
import LineChartImage from '@/assets/img/widgetImage/LineChart.png'
const formConfig: InWidgetFormConfig[] = [
  WidgetBaseConfig,
]
const regist: InRegistItem = {
  name: 'LineChart',
  component: AnyComponentHelper.asyncComponent(() => import('./index.vue')),
  nodeShape: 'lineChart',
  defaultOption: {
    formConfig: formConfig,
  },
  width: 400,
  height: 400,
  image:LineChartImage
}
WidgetBaseConfig.data.assign(regist as unknown as Record<string, unknown>)

export default regist