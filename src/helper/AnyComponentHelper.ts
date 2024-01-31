import { AsyncComponentLoader,defineAsyncComponent } from 'vue';
export class AnyComponentHelper {
  /**
   * 注册异步组件
   */
  static asyncComponent(loader: AsyncComponentLoader, delay = 20) {
    return defineAsyncComponent({
      loader,
      delay,
    })
  }

  /**
   * 加载图片
   */
  static loadImage(src: string) {
    return new Promise<string>((resolve, reject) => {
      const image = new Image()
      image.src = src
      image.onload = () => {
        resolve(src)
      }
      image.onerror = () => {
        reject()
      }
    })
  }
}