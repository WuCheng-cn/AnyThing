/*
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-09 13:29:50
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 14:07:39
 * @FilePath: \anything\src\directives\resize.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
 */
import { ObjectDirective } from 'vue'
/**
 * # 尺寸变化时触发的指令
 */
export const resize: ObjectDirective = {
  mounted(el, binding, vnode) {
    // 这里使用debounce防抖处理，防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
    // 也可以将此处延时去掉，放在绑定的函数中自定义
    function debounce(fn: Function, delay = 16) {
      let t: number | null = null
      return function () {
        if (t) {
          clearTimeout(t)
        }
        const context = this
        const args = arguments
        t = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }
    el._resizer = new window.ResizeObserver(debounce(binding.value, Number(binding.arg) || 16))
    el._resizer.observe(el)
  },
  unmounted(el) {
    el._resizer.disconnect()
  },
}
