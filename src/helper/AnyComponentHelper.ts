import { AsyncComponentLoader,defineAsyncComponent } from 'vue';
export class AnyComponentHelper {
  /**
   * 注册异步组件
   */
  static asyncComponent(url: string) {
    return defineAsyncComponent({
      loader:(() => import(url)) as AsyncComponentLoader,
      delay: 20,
    })
  }
}