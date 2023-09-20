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
import { register } from '@antv/x6-vue-shape'
import { InRegistItem } from "@/interface/graph/InRegistItem";
export default class GraphicsHelper extends Graph {
  /**
   * # 创建画布实例
   * @param container 画布容器
   * @returns 画布实例
   */
 static create(container: HTMLElement): Graph {
   const graph = new Graph({ container, ...GraphOption })
    if (import.meta.env.DEV) {
      this.#createdDevTools(graph)
    }
    this.#moduleRegister(graph)
    this.#hotKeysRegister(graph)
    return graph
    // graph.fromJSON(data)
  }
  
  /**
   * # 创建开发者工具
   * @param instance 画布实例
   */
  static #createdDevTools(instance: Graph): void {
    window.__x6_instances__ = []
    window.__x6_instances__.push(instance)
  }

  /**
   * # 功能模块注册
   * @param instance 画布实例
   * @returns 画布实例
   */
  static #moduleRegister(instance: Graph): Graph {
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
  static #hotKeysRegister(instance: Graph): Graph {
    // 复制
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.COPY)?.value as unknown as string, () => {
      const cells = instance.getSelectedCells()
      if (cells.length) {
        instance.copy(cells)
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
    // 删除
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.DELETE)?.value as unknown as string, () => {
      const cells = instance.getSelectedCells()
      instance.removeCells(cells)
    })
    return instance
  }

  /**
   * 注册自定义组件
   */
  static registComponent(Registry:InRegistItem[]): void {
    Registry.forEach(item => {
      register({
        shape: item.nodeShape,
        width: item.width,
        height: item.height,
        component: item.component,
        data:item.defaultOption
      })
    })
  }

}