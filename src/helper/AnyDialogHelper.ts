import { App, Component, createApp, h, Transition } from "vue";
import naive from 'naive-ui'
import DialogVue from "@/components/UI/Dialog.vue";

export class AnyDialogHelper {
  /**
   * 创建一个对话框
   * @param view 对话框内组件
   * @param param 对话框内组件的参数
   * @param config 对话框配置
   * @returns 对话框的Promise
   */
  static #bulid<RES>(view: Component, param: Record<string, unknown>, config = {}): Promise<RES> {
    const parentNode = document.createElement('div')
    const domId = `any_dialog_${Math.random()}`
    parentNode.setAttribute('id', domId)
    let app: App<Element> | undefined
    // 卸载dom的方法
    function unmount() {
      if (app) {
        app.unmount()
        document.body.removeChild(parentNode)
        app = undefined
      }
    }
    return new Promise<RES>((resolve, reject) => {
      if (app) {
        return
      }
      const dialogParam = {
        onConfirm: async (p: RES) => {
          unmount()
          resolve(p)
        },
        onCancel: () => {
          unmount()
          reject()
        },
        ...param,
      }
      /**
       * 创建App实例
       */
      const renderApp = {
        render: () => h(
          DialogVue,
          {
            "onOn-after-leave": () => {
              console.log('unmount');
              unmount()
            }
          },
          {
            default: () => h(view, dialogParam)
          }
        )
      }
      app = createApp(renderApp).use(naive)
      document.body.appendChild(parentNode)
      // 挂载组件
      app?.mount(parentNode)
    })
  }

  /**
   * 显示一个对话框
   * @param view 对话框内组件
   * @param param 对话框内组件的参数
   * @param config 对话框配置
   * @returns 对话框的Promise
   */
  static showModel<RES>(view: Component, param?: unknown, config = {}): Promise<RES> {
    return this.#bulid(view, { param })
  }
}
