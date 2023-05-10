import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { History } from "@antv/x6-plugin-history";
import { HotKeys, HotKeysRecord } from './config/Hotkeys'
import {
  GraphOption,
  TransformOption,
  SnaplineOption,
  SelectionOption,
  ClipboardOption,
  KeyboardOption,
  HistoryOption,
} from './options/index'
export default class GraphicsMaker {
  graph!: Graph
  constructor(container: HTMLElement) {
    this.#init(container)
  }
  #init(container: HTMLElement): Graph {
    this.graph = new Graph({
      container,
      ...GraphOption
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
  #moduleRegister(instance: Graph): Graph {
    instance
      // 启用对齐线
      .use(new Snapline(SnaplineOption))
      .use(new Transform(TransformOption))
      .use(new Selection(SelectionOption))
      .use(new Clipboard(ClipboardOption))
      .use(new Keyboard(KeyboardOption))
      .use(new History(HistoryOption))
    return instance
  }
  /**
   * # 快捷键注册
   * @param instance 画布实例
   * @returns 画布实例
   */
  #hotKeysRegister(instance: Graph): Graph {
    // 复制
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.COPY)?.value as unknown as string, () => {
      const cells = instance.getSelectedCells()
      if (cells.length) {
        this.graph.copy(cells)
      }
      return false
    })
    // 粘贴
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.PASTE)?.value as unknown as string, () => {
      instance.paste()
    })
    // 撤销
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.UNDO)?.value as unknown as string, () => {
      instance.undo()
    })
    // 重做
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.REDO)?.value as unknown as string, () => {
      instance.redo()
    })
    return instance
  }
}