import { AsyncComponentLoader,defineAsyncComponent } from 'vue';
export class AnyComponentHelper {
  /**
   * 注册异步组件
   */
  static asyncComponent(loader: AsyncComponentLoader) {
    return defineAsyncComponent({
      loader,
      delay: 20,
    })
  }
}