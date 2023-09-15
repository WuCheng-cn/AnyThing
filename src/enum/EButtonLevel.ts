/**
 * 按钮级别枚举
 */
export enum EButtonLevel {
  /**
    * # 一级按钮
    * @description 背景色为主题色，字体色为白色/黑色
    */
  PRIMARY = 'primary',
  /**
   * # 二级按钮
   * @description 背景色为半透明主题色，字体色为主题色
   */
  SECONDARY = 'secondary',
  /**
   * # 三级按钮
   * @description 背景无色半透明，字体色为主题色
   */
  TERTIARY = 'tertiary',
  /**
   * # 四级按钮
   * @description 默认无背景，hover背景半透明无色，字体色为主题色
   */
  QUATERNARY = 'quaternary',
}