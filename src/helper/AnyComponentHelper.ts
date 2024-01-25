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
}