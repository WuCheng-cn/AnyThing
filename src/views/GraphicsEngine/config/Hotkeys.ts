import '@antv/x6-vue-shape'
import { Graph } from '@antv/x6'
import ContextMenu from '../components/contextMenu.vue'
import { Record } from '@/model/basic/Record'
/**
 * graph 绑定事件
 * ctrl + c 剪切节点/边
 * ctrl + v 粘贴节点/边
 * ctrl + z 上一步
 * ctrl + y 下一步
 * Mac系统的 ctrl 键是 meta
 */
// export default function (graph: Graph) {
//   const u = navigator.userAgent.includes('Mac')
//   const key = u ? 'meta' : 'ctrl'
//   // Ctrl + C 拷贝节点
//   graph.bindKey(`${key}+c`, () => {
//     const cells = graph.getSelectedCells()
//     if (cells.length) {
//       graph.copy(cells)
//     }
//     return false
//   })
//   // Ctrl + V 粘贴节点
//   graph.bindKey(`${key}+v`, () => {
//     graph.copy()
//   })
//   // Ctrl + Z 返回上一步
//   graph.bindKey(`${key}+z`, () => {
//     graph.undo()
//   })
//   // Ctrl + Y 取消返回上一步
//   graph.bindKey(`${key}+y`, () => {
//     graph.redo()
//   })
// }
/**
 * # 判断Mac/Windows下的控制按钮
 */
const isMac = navigator.userAgent.includes('Mac')
const command = isMac ? 'meta' : 'ctrl'
/**
 * # 快捷键枚举
 */
export enum HotKeys{
  /**
   * 复制
   */
  COPY = 'c',
  /**
   * 粘贴
   */
  PASTE = 'v',
  /**
   * 撤销
   */
  UNDO = 'z',
  /**
   * 重做
   */
  REDO = 'shift+z',
}
/**
 * # 快捷键翻译
 */
export const HotKeysRecord :Record[] = [
  {
    key:HotKeys.COPY,
    label:'复制',
    value:`${command}+${HotKeys.COPY}`
  },
  {
    key:HotKeys.PASTE,
    label:'粘贴',
    value:`${command}+${HotKeys.PASTE}`
  },
  {
    key:HotKeys.UNDO,
    label:'撤销',
    value:`${command}+${HotKeys.UNDO}`
  },
  {
    key:HotKeys.REDO,
    label:'重做',
    value:`${command}+${HotKeys.REDO}`
  },
]