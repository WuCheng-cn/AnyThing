export interface InMinimizeConfig {
  /**
   * # 对话框缩到的x坐标
   */
  minimizeToX: number

  /**
   * # 对话框缩到的y坐标
   * @description 如果不设置，则默认缩到屏幕底部
   */
  minimizeToY: number

  /**
   * # 对话框缩到的目标dom
   */
  targetDom?: HTMLElement
}