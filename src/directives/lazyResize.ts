import type { ObjectDirective } from 'vue'
/**
 * # 尺寸变化完成后设置元素宽高跟随父元素的指令
 * @param {string} type 设置类型
 * @param {number} delay 延迟时间
 * @description 例：<div v-lazyResize:height="300"></div> 尺寸变化完成300ms后设置高度
 */
export const lazyResize: ObjectDirective = {
  mounted(el, binding, _vnode) {
    (el as HTMLElement).style.cssText = 'opacity:0 ;transition:all .5s'
    const { value } = binding
    const type = binding.arg
    function debounce(delay = 16) {
      let t: any = null
      return function () {
        if (t) {
          clearTimeout(t)
        }
        t = setTimeout(() => {
          const { width, height } = (el as HTMLElement).parentElement!.getBoundingClientRect()
          let cssText = ''
          switch (type) {
            case 'width':
              cssText = `
                width:${width}px;
                opacity:1;
                transition:opacity .5s;
              `
              break
            case 'height':
              cssText = `
                height:${height}px;
                opacity:1;
                transition:opacity .5s;
              `
              break
            default:
              cssText = `
                width:${width}px;
                height:${height}px;
                opacity:1;
                transition:opacity .5s;
              `
              break
          }

          (el as HTMLElement).style.cssText = cssText
        }, delay)
      }
    }
    el._resizer = new window.ResizeObserver(debounce(Number(value) || 16))
    el._resizer.observe((el as HTMLElement).parentElement)
  },
  unmounted(el) {
    el._resizer.disconnect()
  },
}
