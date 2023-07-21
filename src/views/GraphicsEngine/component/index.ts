import Demo from './widget/Demo.vue'
import LineChart from './charts/lineChart.vue'
import WidgetImage from './widget/widget-image.vue'
import { DefineComponent } from 'vue';
interface RegistryItem {
  name: string;
  componentComplete: DefineComponent<{}, {}, any>;
  componentSample?: DefineComponent<{}, {}, any>;
}
const Registry:RegistryItem[] = [
  {
    name:'Demo',
    componentComplete:Demo
  },
 {
    name:'LineChart',
    componentComplete:LineChart
  },
  {
    name:'WidgetImage',
    componentComplete:WidgetImage
  }
]

export {
  Demo,
  LineChart,
  WidgetImage
}