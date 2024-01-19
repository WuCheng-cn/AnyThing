import { TBaseType } from "@/type/TBaseType";

/**
 * # fetch请求类
 */
export class AnyFetchHttp {
  /**
   * # 请求是否正在进行中
   */
  private loading: boolean = false;

  /**
   * # 请求头
   */
  private headers: TBaseType = {};

  /**
   * # 请求控制器
   * @description 该控制器用于取消请求
   */
  private controller: AbortController = new AbortController();

  /**
   * # 请求超时时间（毫秒）
   * @default 5 * 1000
   * @description 该时间为0时，表示不设置超时时间
   */
  private timeout: number = 5 * 1000;

  constructor(loading?: boolean) {
    this.loading = loading || false;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  /**
   * # 发起请求
   * @param url 请求地址
   * @param method 请求方法
   * @param params 请求参数
   */
  private request(url: string, method: string, params?: any):Promise<TBaseType> {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        reject('请求正在进行中，请稍后再试');
      }
      this.loading = true;

      // 超时处理
      this.timeoutHandler();

      fetch(url, {
        method,
        body: JSON.stringify(params),
        headers: this.headers,
        signal: this.controller.signal
      }).then(res => {
        this.loading = false;
        if (res.ok) {
          return res.json();
        } else {
          reject(res.statusText);
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        this.errorHandler(err);
        reject(err);
      });
    });
  }

  /**
   * # 超时处理
   */
  private timeoutHandler() {
    if (this.timeout > 0) {
      setTimeout(() => {
        this.loading = false;
        this.controller.abort();
      }, this.timeout);
    }
  }

  /**
   * # 请求错误处理
   * @param err 错误信息
   */
  private errorHandler(err: any) {
    this.loading = false;
    this.controller.abort();
  }

  /**
   * # 发起get请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起get请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().get(url, params);
   * ```
   */
  async get(url: string, params?: any) {
    return await this.request(url, 'GET', params);
  }

  /**
   * # 发起post请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起post请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().post(url, params);
   * ```
   */
  async post(url: string, params?: any) {
    return await this.request(url, 'POST', params);
  }

  /**
   * # 发起put请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起put请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().put(url, params);
   * ```
   */
  async put(url: string, params?: any) {
    return await this.request(url, 'PUT', params);
  }

  /**
   * # 发起delete请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起delete请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().delete(url, params);
   * ```
   */
  async delete(url: string, params?: any) {
    return await this.request(url, 'DELETE', params);
  }

  /**
   * # 设置请求头
   * @param headers 请求头
   * @description 该方法会将传入的请求头合并到当前请求头中
   * @example
   * ```ts
   * new AnyFetchRequest().setHeaders(headers);
   * ```
   */
  setHeaders(headers: TBaseType) {
    this.headers = {
      ...this.headers,
      ...headers
    };
    return this;
  }

  /**
   * # 清空请求头
   * @description 该方法会清空请求头
   * @example
   * ```ts
   * new AnyFetchRequest().clearHeaders();
   * ```
   */
  clearHeaders() {
    this.headers = {};
    return this;
  }

  /**
   * # 删除请求头
   * @param key 请求头key
   * @description 该方法会删除指定key的请求头
   * @example
   * ```ts
   * new AnyFetchRequest().deleteHeader(key);
   * ```
   */
  deleteHeader(key: string) {
    delete this.headers[key];
    return this;
  }

  /**
   * # 设置请求超时时间
   * @param timeout 超时时间（毫秒）
   * @description 该方法会设置请求超时时间
   * @example
   * ```ts
   * new AnyFetchRequest().setTimeout(timeout);
   * ```
   * @description 该时间为0时，表示不设置超时时间
   */
  setTimeout(timeout: number) {
    this.timeout = timeout;
    return this;
  }

  /**
   * # 取消请求
   * @description 该方法会取消请求
   * @example
   * ```ts
   * new AnyFetchRequest().cancel();
   * ```
   */
  cancel() {
    this.controller.abort();
    return this;
  }

}