import { DefineComponent } from "vue";
import { InInitializeConfig } from "../desktop/InInitializeConfig";

export interface InDialogConfig {
  /**
   * # 对话框标题
   */
  title?: string

  /**
   * # 要使用的对话框组件
   */
  dialogComponent?: DefineComponent<{}, {}, any>

  /**
   * # 对话框挂载时的回调
   */
  onModelMounted?: (modelDom:HTMLElement) => Promise<InInitializeConfig>

  /**
   * # 对话框关闭前的回调
   * @description 返回false则不关闭对话框
   */
  beforClose?: () => Promise<boolean>

  /**
   * # 对话框缩小前的回调
   * @description 返回false则不缩小对话框
   */
  beforMinimize?: () => Promise<void>

}