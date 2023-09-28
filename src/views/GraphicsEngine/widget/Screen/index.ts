import { useConfig } from "@/config";
import { AnyComponentHelper } from "@/helper/AnyComponentHelper";
import { InRegistItem } from "@/interface/graph/InRegistItem";

const regist:InRegistItem = {
  name:'Screen',
  nodeShape:'Screen',
  width:useConfig().GraphConfig.expectWidth,
  height:useConfig().GraphConfig.expectHeight,
  component:AnyComponentHelper.asyncComponent(() => import('./index.vue')),
  defaultOption:{
    isParent:true,
  }
}

export default regist