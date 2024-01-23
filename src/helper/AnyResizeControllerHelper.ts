/**
 * # resize 助手类
 * @description 传入一个元素，给该元素添加 resize 功能
 */
export class AnyResizeControllerHelper {
  element: HTMLElement;
  /**
   * # 初始状态
   */
  initStatus = {
    mouseStartX: 0,
    mouseStartY: 0,
    elementWidth: 0,
    elementHeight: 0,
    elementLeft: 0,
    elementTop: 0,
    elementRight: 0,
    elementBottom: 0,
    transtion:''
  };

  currentController: HTMLElement | null = null;

  constructor(element: HTMLElement) {
    // 创建l, r, t, b, lt, rt, lb, rb 8个控制点
      this.element = element;
      this.#createControllerL();
      this.#createControllerR();
      this.#createControllerT();
      this.#createControllerB();
      this.#createControllerLT();
      this.#createControllerRT();
      this.#createControllerLB();
      this.#createControllerRB();
      console.log(this);
      
  }

  #createControllerL() {
    const l = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 10px;
      height: 100%;
      left: -5px;
      top: 0;
      cursor: w-resize;
    `;
    l.style.cssText = cssText;
    l.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(l);
  }

  #createControllerR() {
    const r = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 10px;
      height: 100%;
      right: -5px;
      top: 0;
      cursor: e-resize;
    `;
    r.style.cssText = cssText;
    r.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(r);
  }

  #createControllerT() {
    const t = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 100%;
      height: 10px;
      left: 0;
      top: -5px;
      cursor: n-resize;
    `;
    t.style.cssText = cssText;
    t.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(t);
  }

  #createControllerB() {
    const b = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 100%;
      height: 10px;
      left: 0;
      bottom: -5px;
      cursor: s-resize;
    `;
    b.style.cssText = cssText;
    b.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(b);
  }

  #createControllerLT() {
    const lt = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      left: -5px;
      top: -5px;
      cursor: nw-resize;
    `;
    lt.style.cssText = cssText;
    lt.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(lt);
  }

  #createControllerRT() {
    const rt = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      right: -5px;
      top: -5px;
      cursor: ne-resize;
    `;
    rt.style.cssText = cssText;
    rt.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(rt);
  }

  #createControllerLB() {
    const lb = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      left: -5px;
      bottom: -5px;
      cursor: sw-resize;
    `;
    lb.style.cssText = cssText;
    lb.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(lb);
  }

  #createControllerRB() {
    const rb = document.createElement('div');
    const cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      right: -5px;
      bottom: -5px;
      cursor: se-resize;
    `;
    rb.style.cssText = cssText;
    rb.addEventListener('mousedown', this.#startResize);
    this.element.appendChild(rb);
  }

  /**
   * # 点击控制点后，开始 resize
   */
  #startResize = (e: MouseEvent) => {    
    console.log('startResize',this.initStatus);
    // 阻止默认事件
    e.preventDefault();
    // 获取当前点击的控制点
    this.currentController = e.target as HTMLElement;
    // 获取鼠标点击时的坐标
    this.initStatus.mouseStartX = e.clientX;
    this.initStatus.mouseStartY = e.clientY;
    // 获取元素的宽高
    this.initStatus.elementWidth = this.element.offsetWidth;
    this.initStatus.elementHeight = this.element.offsetHeight;
    console.log(this.initStatus.elementWidth ,this.initStatus.elementHeight);
    
    // 获取元素的 left, top, right, bottom
    const { left, top, right, bottom } = this.element.getBoundingClientRect();
    console.log(left, top, right, bottom);
    
    this.initStatus.elementLeft = left;
    this.initStatus.elementTop = top;
    
    this.initStatus.elementRight = right - this.initStatus.elementWidth;
    this.initStatus.elementBottom = bottom - this.initStatus.elementHeight;
    // 记录并移除元素的 transition
    this.initStatus.transtion = this.element.style.transition;
    this.element.style.transition = 'unset';
    // 给 document 添加 mousemove 和 mouseup 事件
    document.addEventListener('mousemove', this.#mousemove);
    document.addEventListener('mouseup', this.#mouseup);
  }

  /**
   * # 鼠标移动时，改变元素的宽高
   */
  #mousemove = (e: MouseEvent) => {
    // 获取鼠标移动时的坐标
    const mouseMoveX = e.clientX;
    const mouseMoveY = e.clientY;
    // 获取鼠标移动的距离
    const moveX = mouseMoveX - this.initStatus.mouseStartX;
    const moveY = mouseMoveY - this.initStatus.mouseStartY;
    // 根据控制点的不同，改变元素的宽高
      let cssText = '';
      switch (this.currentController?.style.cursor) {
        case 'w-resize':
          // console.log(this.initStatus.elementWidth ,moveX);
          
          cssText = `
            width: ${this.initStatus.elementWidth  - moveX}px;
            top: ${this.initStatus.elementTop}px;
            left: unset;
            right:${this.initStatus.elementRight}px;
            bottom:unset;
            transition: unset;
            `;       
             
          this.element.style.cssText = cssText;
          break;
        case 'e-resize':
          cssText = `
            width: ${this.initStatus.elementWidth + moveX}px;
            top: ${this.initStatus.elementTop}px;
            left: ${this.initStatus.elementLeft}px;;  
            right: unset;
            bottom:unset;
            transition: unset;
          `;
          this.element.style.cssText = cssText;
          break;
        case 'n-resize':
          break;
        case 's-resize':
          break;
        case 'nw-resize':
          break;
        case 'ne-resize':
          break;
        case 'sw-resize':
          break;
        case 'se-resize':
          break;
        default:
          break;
      }
  }

  /**
   * # 鼠标抬起时，移除 mousemove 和 mouseup 事件
   */
  #mouseup = () => {
    console.log('mouseup');
    // 给元素添加 transition
    this.element.style.transition = this.initStatus.transtion;
    document.removeEventListener('mousemove', this.#mousemove);
    document.removeEventListener('mouseup', this.#mouseup);
  }
}