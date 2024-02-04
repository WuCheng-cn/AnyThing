import { useConfig } from "@/config"
import { AppEntity } from "@/entity/desktop/AppEntity"
import { AppTaskEntity } from "@/entity/desktop/AppTaskEntity"

export class DesktopManageHelper {
  /**
   * # 设置当前激活的app
   * @param app AppEntity
   */
  static setCurrentApp(app: AppEntity) {
    const { currentApp } = useConfig().DesktopConfig
    if (currentApp) {
      currentApp.dom?.classList.remove('active')
    }
    app.dom?.classList.add('active')
    useConfig().DesktopConfig.currentApp = app
  }

  /**
   * # 添加任务
   * @param app AppEntity
   */
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

  /**
   * # 移除任务
   * @param task AppTaskEntity
   */
  static removeTask(task: AppTaskEntity) {
    const { appTaskList } = useConfig().DesktopConfig
    const index = appTaskList.findIndex((item) => item.id === task.id)
    appTaskList.splice(index, 1)
  }

  /**
   * # 获取任务栏dom
   * @param app AppEntity
   */
  static getTaskDomByApp(app: AppEntity) {
    const { appTaskList } = useConfig().DesktopConfig
    const task = appTaskList.find((item) => item.app.name === app.name)
    return (task?.taskBarDom as HTMLElement) || null
  }

  /**
   * # 设置最高层级弹窗
   * @param modelDom HTMLElement
   */
  static setHighestModel(modelDom: HTMLElement) {
    const { highestIndex, refreshHighestIndex } = useConfig().DesktopConfig
    modelDom.style.zIndex = highestIndex.toString()
    refreshHighestIndex()
  }

  /**
   * # 设置任务栏dom
   * @param taskBarDom HTMLElement
   * @param app AppEntity
   */
  static setTaskBarDomByApp(taskBarDom: HTMLElement, app: AppEntity) {
    const { appTaskList } = useConfig().DesktopConfig
    appTaskList.filter((item) => item.app.name === app.name).forEach((item) => {
      item.setTaskBarDom(taskBarDom)
    })
  }

  /**
   * # 刷新任务缩略视图
   * @param task AppTaskEntity
   * @param currentNode HTMLElement
   */
  static refreshTaskView(task: AppTaskEntity,currentNode:HTMLElement){
    const modelDom = task.modelDom
    if (modelDom && !task.isMinimize) {    
      const {width , height} = modelDom.getBoundingClientRect()
      const cloneDom = modelDom.cloneNode(true) as HTMLElement
      const scaleRateX = 196 / width 
      const scaleRateY = 100 / height 
      const cssText = `
        position: relative;
        overflow: hidden;
        width: ${width}px;
        height: ${height}px;
        left: unset;
        top: unset;
        right: unset;
        bottom: unset; 
        pointer-events: none;
        transform: scale(${scaleRateX}, ${scaleRateY});
        transform-origin: left top;
        opacity: 1 !important;
        transition:unset;
      `
      cloneDom.style.cssText = cssText
      // 先清除传入节点下的子节点
      while (currentNode.firstChild) {
        currentNode.removeChild(currentNode.firstChild)
      }
      currentNode.appendChild(cloneDom)
    }
  }
}