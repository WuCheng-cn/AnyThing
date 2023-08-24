import {  MessageType, useMessage } from 'naive-ui'
type PlacementType = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'middle'

/**
 * 消息助手
 * @description 该助手基于NaiveUI的Message组件
 * @description 该助手提供了一些常用的消息类型 info、success、warning、error、loading
 * @description 该助手提供了一些常用的消息设置 setDuration、setPlacement、setClosable
 * @description 该助手提供了一个默认的消息类型 default
 * @description 支持链式调用
 */
export class AnyMessageHelper {
  /**
   * 消息持续时间
   */
  private duration = 3000

  /**
   * 消息展示位置
   */
  private placement:PlacementType = 'top'

  /**
   * 消息类型
   */
  private type: MessageType = 'info'

  /**
   * 消息是否可关闭
   */
  private closable = true

  /**
   * 消息是否保持悬停
   * @description 鼠标悬停时不关闭消息
   */
  private keepAliveOnHover = true

  #createMessage(message: string) {
    return useMessage().create(message, {
      duration: this.duration,
      // @ts-ignore
      placement: this.placement,
      type: this.type,
      closable: this.closable,
      keepAliveOnHover: this.keepAliveOnHover
    })
  }

  /**
   * 创建一个默认消息
   * @param message 消息内容
   */
  default(message: string) {
    this.type = 'default'
    this.#createMessage(message)
  }

  /**
   * 创建一个消息
   * @param message 消息内容
   */
  info(message: string) {
    this.type = 'info'
    this.#createMessage(message)
  }

  /**
   * 创建一个成功消息
   * @param message 消息内容
   */
  success(message: string) {
    this.type = 'success'
    this.#createMessage(message)
  }

  /**
   * 创建一个警告消息
   * @param message 消息内容
   */
  warning(message: string) {
    this.type = 'warning'
    this.#createMessage(message)
  }

  /**
   * 创建一个错误消息
   * @param message 消息内容
   */
  error(message: string) {
    this.type = 'error'
    this.#createMessage(message)
  }

  /**
   * 创建一个加载中消息
   * @param message 消息内容
   * @description 该消息不可关闭
   * @description 该消息不保持悬停
   * @description 该消息持续时间为0
   * @description 该消息展示位置为中间
   * @description 该消息类型为加载中
   */
  loading(message: string) {
    this.closable = false
    this.keepAliveOnHover = false
    this.duration = 0
    this.placement = 'middle'
    this.type = 'loading'
    this.#createMessage(message)
  }

  /**
   * 设置消息持续时间
   * @param duration 持续时间
   * @description 消息持续时间为0时，消息不会自动关闭
   */
  setDuration(duration: number) {
    this.duration = duration
    return this
  }

  /**
   * 设置消息展示位置
   * @param placement 展示位置
   * @description 展示位置可选值：top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end、middle
   */
  setPlacement(placement: PlacementType) {
    this.placement = placement
    return this
  }

  /**
   * 设置消息是否可关闭
   * @param closable 是否可关闭
   * @description 消息不可关闭时，消息不会显示关闭按钮
   * @description 消息不可关闭时，消息不会自动关闭
   * @description 消息不可关闭时，消息不会保持悬停
   * @description 消息不可关闭时，消息持续时间为0
   */
  setClosable(closable: boolean) {
    this.closable = closable
    return this
  }

}