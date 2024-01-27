import { useConfig } from "@/config"
import { AppEntity } from "@/entity/desktop/AppEntity"
import { AppTaskEntity } from "@/entity/desktop/AppTaskEntity"

export class DesktopManageHelper {
  static setCurrentApp(app: AppEntity) {
    const { currentApp } = useConfig().DesktopConfig
    if (currentApp) {
      currentApp.dom?.classList.remove('active')
    }
    app.dom?.classList.add('active')
    useConfig().DesktopConfig.currentApp = app
  }

  static addTask(app: AppEntity) {
    this.setCurrentApp(app)
    const { appTaskList } = useConfig().DesktopConfig
    const task = new AppTaskEntity(app)
    const taskBarDom = this.getTaskDomByApp(app)
    if (taskBarDom) {
      task.setTaskBarDom(taskBarDom)
    }
    task.id = Date.now()
    task.setActive(true)
    appTaskList.push(task)
    return task
  }

  static removeTask(task: AppTaskEntity) {
    const { appTaskList } = useConfig().DesktopConfig
    const index = appTaskList.findIndex((item) => item.id === task.id)
    appTaskList.splice(index, 1)
  }

  static getTaskDomByApp(app: AppEntity) {
    const { appTaskList } = useConfig().DesktopConfig
    const task = appTaskList.find((item) => item.app.name === app.name)
    return (task?.taskBarDom as HTMLElement) || null
  }

  static setHighestModel(modelDom: HTMLElement) {
    const { highestIndex, refreshHighestIndex } = useConfig().DesktopConfig
    modelDom.style.zIndex = highestIndex.toString()
    refreshHighestIndex()
  }
}