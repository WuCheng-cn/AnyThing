import Screen from "./index.vue";
import { useConfig } from "@/config";
import { InRegistItem } from "@/interface/graph/InRegistItem";

const regist:InRegistItem = {
  name:'Screen',
  nodeShape:'Screen',
  width:useConfig().GraphConfig.expectWidth,
  height:useConfig().GraphConfig.expectHeight,
  component:Screen,
  defaultOption:{
    isParent:true,
  }
}

export default regist