import { InRegistItem } from "@/interface/graph/InRegistItem";
import  WidgetImage  from "./index.vue";
import Amelia from '@/assets/img/widgetImage/Amelia.gif'


const regist:InRegistItem = {
  name: 'WidgetImage',
  nodeShape: 'widgetImage',
  width: 200,
  height: 200,
  image:Amelia,
  component: WidgetImage,
  defaultOption: {},
}

export default regist