import { InRecord } from '@/interface/base/InRecord'
/**
 * graph 绑定事件
 * ctrl + c 剪切节点/边
 * ctrl + v 粘贴节点/边
 * ctrl + z 上一步
 * ctrl + y 下一步
 * Mac系统的 ctrl 键是 meta
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
export const HotKeysRecord :InRecord[] = [
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