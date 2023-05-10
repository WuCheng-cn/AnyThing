import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { History } from "@antv/x6-plugin-history";
import { HotKeys, HotKeysRecord } from './config/Hotkeys'
export default class GraphicsMaker {
  graph!:Graph
  constructor(container:HTMLElement){
    this.#init(container)
  }
  #init(container:HTMLElement):Graph{
    this.graph = new Graph({
      container,
      // 启用滚轮缩放画布
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    })
    this.#moduleRegister(this.graph)
    this.#hotKeysRegister(this.graph)
    return this.graph
    // this.graph.fromJSON(data)
  }
  /**
   * # 功能模块注册
   * @param instance 画布实例
   * @returns 画布实例
   */
  #moduleRegister(instance:Graph):Graph{
    instance
    .use(
      // 启用对齐线
      new Snapline({
        enabled: true,
        className: 'any-snapline',
        clean: false,
      }),
    )
    .use(
      new Transform({
        resizing: {
          enabled: true, // 是否支持调整节点大小
          minWidth: 40, // 最小的调整宽度
          minHeight: 40, // 最小的调整高度
          maxWidth: Infinity, // 最大的调整宽度
          maxHeight: Infinity, // 最大的调整高度
          orthogonal: true, // 是否显示中间调整点
          restrict: true, // 调整大小边界限制
          autoScroll: false, // 拖动位置超过画布时是否自动滚动画布
          preserveAspectRatio: true, // 调整大小过程中是否保持节点的宽高比例
          allowReverse: false, // 到达最小宽度或者高度时是否允许控制点反向拖动
        },
      }),
    )
    .use(
      new Selection({
        enabled: true,
        multiple: true,
        rubberband: true,
        showNodeSelectionBox: true,
      }),
    )
    .use(
      new Clipboard({
        enabled: true,
        useLocalStorage: true,
      }),
    )
    .use(
      new Keyboard({
        enabled: true,
      }),
    )
    .use(
      new History({
        enabled: true,
      })
    )
    return instance
  }
  /**
   * # 快捷键注册
   * @param instance 画布实例
   * @returns 画布实例
   */
  #hotKeysRegister(instance:Graph):Graph{
    // 复制
    instance.bindKey(HotKeysRecord.find(item=>item.key===HotKeys.COPY)?.value as unknown as string,()=>{
      const cells = instance.getSelectedCells()
      if (cells.length) {
        this.graph.copy(cells)
      }
      return false
    })
    // 粘贴
    instance.bindKey(HotKeysRecord.find(item=>item.key===HotKeys.PASTE)?.value as unknown as string,()=>{
      instance.paste()
    })
    // 撤销
    instance.bindKey(HotKeysRecord.find(item=>item.key===HotKeys.UNDO)?.value as unknown as string,()=>{
      instance.undo()
    })
    // 重做
    instance.bindKey(HotKeysRecord.find(item=>item.key===HotKeys.REDO)?.value as unknown as string,()=>{
      instance.redo()
    })
    return instance
  }
}