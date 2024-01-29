
import { AnyDialogHelper } from "@/helper/AnyDialogHelper"
import { AppEntity } from "@/entity/desktop/AppEntity";
import { AppTaskEntity } from "@/entity/desktop/AppTaskEntity";
import { nextTick, DefineComponent } from 'vue'
import { InInitializeConfig } from "@/interface/desktop/InInitializeConfig";
import { DesktopManageHelper } from "./DesktopManageHelper";
import { InDialogParam } from "@/interface/base/InDialogParam";
import { InDialogConfig } from "@/interface/base/InDialogConfig";

export function UseNormalApp() {
  /**
   * # 挂载弹窗时执行的回调
   */
  const onModelMounted = (modelDom: HTMLElement, task: AppTaskEntity): Promise<InInitializeConfig> => {
    return new Promise((resolve) => {
      task.setModelDom(modelDom)
      nextTick(() => {
        const { left, top } = task.taskBarDom!.getBoundingClientRect()
        resolve({
          minimizeToX: left,
          minimizeToY: top,
          targetDom: task.taskViewDom,
        })
      })
    })
  }

  /**
   * 关闭弹窗前执行的回调
   */
  const beforClose = async (task: AppTaskEntity) => {
    DesktopManageHelper.removeTask(task)
    return true
  }

  /**
   * # 最小化弹窗前执行的回调
   */
  const beforMinimize = async (task: AppTaskEntity) => {
    task.setMinimize(true)
  }

  /**
   * 常规应用点击处理函数
   */
  const handler = (view: DefineComponent<{}, {}, any>, param?: InDialogParam, dialogConfig?: InDialogConfig) => (app: AppEntity | AppTaskEntity, callBack: Function) => {
    if (app instanceof AppEntity) {
      const task = DesktopManageHelper.addTask(app)
      if (callBack) {
        callBack()
      }
      AnyDialogHelper.showMacModel(view, param, {
        onModelMounted: (modelDom: HTMLElement) => onModelMounted(modelDom, task),
        beforClose: () => beforClose(task),
        beforMinimize: () => beforMinimize(task),
        ...(dialogConfig ?  dialogConfig  : {})
      })
      
    } else if (app instanceof AppTaskEntity) {
    }
  }

  return {
    onModelMounted,
    beforClose,
    beforMinimize,
    handler
  }
}