

import { Cell,Graph } from "@antv/x6"
import {NodeView} from '@antv/x6'
import { InDefaultOption } from "@/interface/graph/InDefaultOption"

export const GraphOption:any = {
  // 启用滚轮缩放画布
  mousewheel: {
    enabled: true,
    modifiers: ['ctrl', 'meta'],
  },
  background: {
    color: '#fffbe6', // 设置画布背景颜色
  },
  grid: {
    size: 16, // 网格大小 10px
    visible: true, // 渲染网格背景
    
  },
  embedding: {
    enabled: true,
    findParent({node} ):Cell[] {
      const bbox = node.getBBox()
      return (this as unknown as Graph).getNodes().filter((node:Cell) => {
        const data = node.getData<InDefaultOption>()
        if (data.isParent) {
          const targetBBox = node.getBBox()
          return bbox.isIntersectWithRect(targetBBox)
        }
        return false
      })
    },
  },
  highlighting: {
    embedding: {
      name: 'stroke',
      args: {
        padding: -1,
        attrs: {
          stroke: 'var(--primary-color)',
          strokeWidth: 2,
          strokeDasharray:'6 4',
        },
      },
    },
  },
  // translating:{
  //   /**
  //    * # 限制节点移动范围
  //    * @param CellView 节点实例
  //    * @returns 返回限制后的范围
  //    * @description 限制节点在画布内移动
  //    */ 
  //   restrict:(CellView:CellView):Rectangle.RectangleLike=>{
  //     //节点移动在画布中保持的最小宽/高
  //     const minSize = 50
  //     // 判断节点在即将完全移出画布时，禁止移动
  //     const { x, y, width, height } = CellView.getBBox()
  //     const { width: graphWidth, height: graphHeight } = CellView.graph.getGraphArea()
  //     return{
  //       x: minSize - width ,
  //       y: minSize - height,
  //       width: graphWidth + 2*(width - minSize),
  //       height: graphHeight + 2*(height - minSize),
  //     }
      
  //   },
  // }
}
