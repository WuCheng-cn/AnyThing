import { ObjectDirective } from 'vue'
/**
 * # 尺寸变化时触发的指令
 * @description 防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
 */
export const resize: ObjectDirective = {
  mounted(el, binding, vnode) {
    function debounce(fn: Function, delay = 16) {
      let t: number | null = null
      return function () {
        if (t) {
          clearTimeout(t)
        }
        //@ts-ignore
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
