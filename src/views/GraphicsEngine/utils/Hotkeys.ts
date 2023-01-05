import '@antv/x6-vue-shape'
import { Graph } from '@antv/x6'
import ContextMenu from '../components/contextMenu.vue'
/**
 * graph 绑定事件
 * ctrl + c 剪切节点/边
 * ctrl + v 粘贴节点/边
 * ctrl + z 上一步
 * ctrl + y 下一步
 * Mac系统的 ctrl 键是 meta
 */
export default function (graph) {
  const u = navigator.userAgent.includes('Mac')
  const key = u ? 'meta' : 'ctrl'
  // Ctrl + C 拷贝节点
  graph.bindKey(`${key}+c`, () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  // Ctrl + V 粘贴节点
  graph.bindKey(`${key}+v`, () => {
    graph.copy()
  })
  // Ctrl + Z 返回上一步
  graph.bindKey(`${key}+z`, () => {
    graph.undo()
  })
  // Ctrl + Y 取消返回上一步
  graph.bindKey(`${key}+y`, () => {
    graph.redo()
  })
}
