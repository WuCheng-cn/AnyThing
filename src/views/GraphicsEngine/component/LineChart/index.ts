import { InRegistItem } from "@/interface/graph/InRegistItem";
import  LineChart  from "./index.vue";

const regist:InRegistItem = {
  name: 'LineChart',
  component: LineChart,
  nodeShape: 'lineChart',
  defaultOption: {},
  width: 400,
  height: 400,
  isParent: false
}

export default regist