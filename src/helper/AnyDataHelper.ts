
/**
 * # 深拷贝一个对象
 * @param data 源对象
 * @returns 拷贝后的对象
 * @description 解决循环引用的问题
 */
export class AnyDataHelper {
  /**
   * # 深拷贝一个对象
   */
  static deepClone<T>(data: T): T {
    /**
     * 数据缓存
     * @description 该缓存用于解决循环引用的问题
     * @description 该缓存使用WeakMap，因此只能存储对象类型的数据
     * @description 该缓存的key为源对象，value为拷贝后的对象
     * @description 该缓存的key和value都是弱引用，因此不会造成内存泄漏
     */
    const cache = new WeakMap();
    function _clone(target: any) {
      // 如果是对象类型，则进行深拷贝
      if (typeof target === "object") {
        // 如果缓存中存在，则直接返回
        if (cache.has(target)) {
          return cache.get(target);
        }
        // 如果缓存中不存在，则创建一个新的对象/数组
        const result = Array.isArray(target) ? [] : {} as any;
        // 保持新数据原型与源数据一致
        Object.setPrototypeOf(result, Object.getPrototypeOf(target));
        // 将新数据存入缓存
        cache.set(target, result);
        // 递归深拷贝对象/数组的每一个属性
        for (const key in target) {
          result[key] = _clone(target[key]);
        }
        return result;

      }
      // 如果不是对象类型，则直接返回
      return target;
    }

    return _clone(data);

  }

  /**
   * 防抖函数
   */
  static debounce(fn: Function, delay: number) {
    let timer: number | null = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      //@ts-ignore
      const context = this
      const args = arguments
      timer = setTimeout(function () {
        fn.apply(context, args)
      }
        , delay)
    }
  }

  /**
   * # 延迟函数(按帧数延迟)
   */
  static defer(frames: number): () => boolean {
    let count = 0
    const animate = () => {
      requestAnimationFrame(() => {
        count++
        if (count < frames) {
          animate()
        }
      })
    }
    animate()
    return function () {
      return count === frames
    }
  }


  /**
   * # 实现深度合并两个对象的功能。
   * 
   * @param {Object} target 第一个待合并的对象。
   * @param {Object} source 第二个待合并的对象。
   * @return {Object} 合并后的新对象。
   */
  static deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {

    const result: Record<string, any> = {};

    // 遍历第一个对象的所有键
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        // 如果source中也有这个键，并且都是对象，则进行深度合并
        if (source.hasOwnProperty(key) && typeof target[key] === 'object' && typeof source[key] === 'object') {
          result[key] = this.deepMerge(target[key], source[key]);
        } else {
          // 否则直接赋值target的值
          result[key] = target[key];
        }
      }
    }

    // 遍历第二个对象，确保所有source中的键都被考虑进去
    for (const key in source) {
      if (source.hasOwnProperty(key) && !result.hasOwnProperty(key)) {
        result[key] = source[key];
      }
    }

    return result;
  }
}



