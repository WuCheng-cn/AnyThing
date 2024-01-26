import { watch } from "vue";
import { AnyDialogHelper } from "@/helper/AnyDialogHelper"
import { DesktopManageHelper } from "./hooks/DesktopManageHelper";
import { AppEntity } from "@/entity/desktop/AppEntity";
import { AppTaskEntity } from "@/entity/desktop/AppTaskEntity";
import CodeView from '@/views/CodeView/index.vue'
import AppIconSvg from '@/assets/img/appIcon/anyIcon.svg'

const onModelMounted = async (modelDom:HTMLElement, task: AppTaskEntity) => {
  task.setModelDom(modelDom)
}

const beforClose = async (task: AppTaskEntity) => {
  DesktopManageHelper.removeTask(task)
  return true
}

const beforMinimize = async (task: AppTaskEntity) => {
  task.setMinimize(true)
  const { left , top } = task.taskBarDom!.getBoundingClientRect()
  return {
    minimizeToX:left,
    minimizeToY:top,
    targetDom:task.taskViewDom,
  }
}

const handler = (app: AppEntity| AppTaskEntity) => {
  if (app instanceof AppEntity) {
    const task = DesktopManageHelper.addTask(app)
    AnyDialogHelper.showMacModel(CodeView, {}, {
      onModelMounted: (modelDom:HTMLElement) => onModelMounted(modelDom,task),
      beforClose: () => beforClose(task),
      beforMinimize: () => beforMinimize(task),
    })
  }else if (app instanceof AppTaskEntity) {
    app.setMinimize(!app.isMinimize)
  }
}

export const AppList = [
  new AppEntity().assign({
    name: '模板打印',
    icon: AppIconSvg,
    handler
  }),
  new AppEntity().assign({
    name: '图形引擎',
    icon: AppIconSvg,
    handler
  }),
  new AppEntity().assign({
    name: '代码编辑器',
    icon: AppIconSvg,
    handler
  }),
  new AppEntity().assign({
    name: 'GIS引擎',
    icon: AppIconSvg,
    handler
  }),
];