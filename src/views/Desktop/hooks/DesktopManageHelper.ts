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
    task.setActive(true)
    appTaskList.push(task)
    return task
  }

  static removeTask(task: AppTaskEntity) {
    const { appTaskList } = useConfig().DesktopConfig
    const index = appTaskList.findIndex((item) => item === task)
    appTaskList.splice(index, 1)
  }
}