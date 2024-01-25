import { watch } from "vue";
import { AnyDialogHelper } from "@/helper/AnyDialogHelper"
import { DesktopManageHelper } from "./hooks/DesktopManageHelper";
import { AppEntity } from "@/entity/desktop/AppEntity";
import { AppTaskEntity } from "@/entity/desktop/AppTaskEntity";
import CodeView from '@/views/CodeView/index.vue'
import AppIconSvg from '@/assets/img/appIcon/anyIcon.svg'


const beforClose = async (task: AppTaskEntity) => {
  DesktopManageHelper.removeTask(task)
  return true
}

const onModelMounted = async (task: AppTaskEntity) => {
  watch(task, (task) => {
    if (task.isMinimize) {
      task.setActive(false)
    } else {
      task.setActive(true)
    }
  },{deep: true})
}

export const AppList = [
  new AppEntity().assign({
    name: '模板打印',
    icon: AppIconSvg,
    handler: (app: AppEntity| AppTaskEntity) => {
      if (app instanceof AppEntity) {
        const task = DesktopManageHelper.addTask(app)
        AnyDialogHelper.showMacModel(CodeView, {}, {
          beforClose: () => beforClose(task),
          onModelMounted: () => onModelMounted(task),
        })
      }else if (app instanceof AppTaskEntity) {
        app.setMinimize(!app.isMinimize)
      }
    }
  }),
  new AppEntity().assign({
    name: '图形引擎',
    icon: AppIconSvg,
  }),
  new AppEntity().assign({
    name: '代码编辑器',
    icon: AppIconSvg,
  }),
  new AppEntity().assign({
    name: 'GIS引擎',
    icon: AppIconSvg,
  }),
];