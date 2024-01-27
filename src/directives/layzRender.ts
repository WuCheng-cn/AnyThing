import { ObjectDirective } from 'vue'
/**
 * # 尺寸变化完成后设置元素宽高跟随父元素的指令
 * @description 防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
 */
export const layzRender: ObjectDirective = {
  mounted(el, binding, vnode) {
    (el as HTMLElement).style.cssText = 'opacity:0 ;transition:all .5s'
    function debounce(delay = 16) {
      let t: number | null = null
      return function () {
        if (t) {
          clearTimeout(t)
        }
        t = setTimeout(function () {
          const { width, height } = (el as HTMLElement).parentElement!.getBoundingClientRect();
          console.log(width.toString(), height.toString());
          const cssText = `
            width:${width}px;
            height:${height}px;
            opacity:1;
            transition:all .5s;
          `;
          (el as HTMLElement).style.cssText = cssText
        }, delay)
      }
    }
    el._resizer = new window.ResizeObserver(debounce(Number(binding.arg) || 16))
    el._resizer.observe((el as HTMLElement).parentElement)
  },
  unmounted(el) {
    el._resizer.disconnect()
  },
}
