export class AnyResizeControllerHelper {
  element: HTMLElement;
  initStatus = {
    mouseStartX: 0,
    mouseStartY: 0,
    elementWidth: 0,
    elementHeight: 0,
    elementLeft: 0,
    elementTop: 0,
    elementRight: 0,
    elementBottom: 0,
    transtion: ''
  };
  config = {
    minWidth: 400,
    minHeight: 270,
    minDistanceToClient: 10
  }

  currentController: HTMLElement | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
    const controllers = [
      { cssText: `position: absolute; width: 10px; height: 100%; left: -5px; top: 0; cursor: w-resize;`, listener: this.startResize },
      { cssText: `position: absolute; width: 10px; height: 100%; right: -5px; top: 0; cursor: e-resize;`, listener: this.startResize },
      { cssText: `position: absolute; width: 100%; height: 10px; left: 0; top: -5px; cursor: n-resize;`, listener: this.startResize },
      { cssText: `position: absolute; width: 100%; height: 10px; left: 0; bottom: -5px; cursor: s-resize;`, listener: this.startResize },
      { cssText: `position: absolute; width: 10px; height: 10px; left: -5px; top: -5px; cursor: nw-resize;`, listener: this.startResize },
      { cssText: `position: absolute; width: 10px; height: 10px; right: -5px; top: -5px; cursor: ne-resize;`, listener: this.startResize },
      { cssText: `position: absolute; width: 10px; height: 10px; left: -5px; bottom: -5px; cursor: sw-resize;`, listener: this.startResize },
      { cssText: `position: absolute; width: 10px; height: 10px; right: -5px; bottom: -5px; cursor: se-resize;`, listener: this.startResize }
    ];
    for (const controller of controllers) {
      this.createController(controller.cssText, controller.listener as EventListener);
    }
  }

  private createController(cssText: string, listener: EventListener) {
    const controller = document.createElement('div');
    controller.style.cssText = cssText;
    controller.addEventListener('mousedown', listener);
    this.element.appendChild(controller);
  }

  private startResize = (e: MouseEvent) => {
    e.preventDefault();
    this.currentController = e.target as HTMLElement;

    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight } = this.element;
    const { left, top } = this.element.getBoundingClientRect();
    const elementRight = document.documentElement.clientWidth - left - offsetWidth;
    const elementBottom = document.documentElement.clientHeight - top - offsetHeight;
    const transition = this.element.style.transition;

    Object.assign(this.initStatus, {
      mouseStartX: clientX,
      mouseStartY: clientY,
      elementWidth: offsetWidth,
      elementHeight: offsetHeight,
      elementLeft: left,
      elementTop: top,
      elementRight,
      elementBottom,
      transition
    });

    this.element.style.transition = 'unset';
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  }


  private mousemove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const {
      mouseStartX,
      mouseStartY,
      elementWidth,
      elementHeight,
      elementTop,
      elementLeft,
      elementRight,
      elementBottom
    } = this.initStatus;
    const moveX = clientX - mouseStartX;
    const moveY = clientY - mouseStartY;
    const documentWidth = document.documentElement.clientWidth;
    const documentHeight = document.documentElement.clientHeight;

    const getClampedWidth = (width: number, distanceToClient: number) => {
      const minWidth = this.config.minWidth;
      const maxWidth = documentWidth - distanceToClient - this.config.minDistanceToClient;
      return Math.min(Math.max(width, minWidth), maxWidth);
    };

    const getClampedHeight = (height: number, distanceToClient: number) => {
      const minHeight = this.config.minHeight;
      const maxHeight = documentHeight - distanceToClient - this.config.minDistanceToClient;
      return Math.min(Math.max(height, minHeight), maxHeight);
    };

    const getClampedDistance = (distance: number, fixedDistance: number) => {
      return Math.max(Math.min(distance, fixedDistance), this.config.minDistanceToClient);
    };

    let cssText = '';
    switch (this.currentController?.style.cursor) {
      case 'w-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth - moveX, elementRight)}px;
        height: ${elementHeight}px;
        top: ${elementTop}px;
        left: ${getClampedDistance(elementLeft + moveX, documentWidth - this.config.minWidth - elementRight)}px;
        right:${elementRight}px;
        bottom:${elementBottom}px;
        transition: unset;
      `;
        break;
      case 'e-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth + moveX, elementLeft)}px;
        height: ${elementHeight}px;
        top: ${elementTop}px;
        left: ${elementLeft}px;
        right:${getClampedDistance(elementRight - moveX, documentWidth - this.config.minWidth - elementLeft)}px;
        bottom:${elementBottom}px;
        transition: unset;
      `;
        break;
      case 'n-resize':
        cssText = `
        width: ${elementWidth}px;
        height: ${getClampedHeight(elementHeight - moveY, elementBottom)}px;
        top: ${getClampedDistance(elementTop + moveY, documentHeight - this.config.minHeight - elementBottom)}px;
        left: ${elementLeft}px;
        right:${elementRight}px;
        bottom:${elementBottom}px;
        transition: unset;
      `;
        break;
      case 's-resize':
        cssText = `
        width: ${elementWidth}px;
        height: ${getClampedHeight(elementHeight + moveY, elementTop)}px;
        top: ${elementTop}px;
        left: ${elementLeft}px;
        right:${elementRight}px;
        bottom:${getClampedDistance(elementBottom - moveY, documentHeight - this.config.minHeight - elementTop)}px;
        transition: unset;
      `;
        break;
      case 'nw-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth - moveX, elementRight)}px;
        height: ${getClampedHeight(elementHeight - moveY, elementBottom)}px;
        top: ${getClampedDistance(elementTop + moveY, documentHeight - this.config.minHeight - elementBottom)}px;
        left: ${getClampedDistance(elementLeft + moveX, documentWidth - this.config.minWidth - elementRight)}px;
        right:${elementRight}px;
        bottom:${elementBottom}px;
        transition: unset;
      `;
        break;
      case 'ne-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth + moveX, elementLeft)}px;
        height: ${getClampedHeight(elementHeight - moveY, elementBottom)}px;
        top: ${getClampedDistance(elementTop + moveY, documentHeight - this.config.minHeight - elementBottom)}px;
        left: ${elementLeft}px;
        right:${getClampedDistance(elementRight - moveX, documentWidth - this.config.minWidth - elementLeft)}px;
        bottom:${elementBottom}px;
        transition: unset;
      `;
        break;
      case 'sw-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth - moveX, elementRight)}px;
        height: ${getClampedHeight(elementHeight + moveY, elementTop)}px;
        top: ${elementTop}px;
        left: ${getClampedDistance(elementLeft + moveX, documentWidth - this.config.minWidth - elementRight)}px;
        right:${elementRight}px;
        bottom:${getClampedDistance(elementBottom - moveY, documentHeight - this.config.minHeight - elementTop)}px;
        transition: unset;
      `;
        break;
      case 'se-resize':
        cssText = `
        width: ${getClampedWidth(elementWidth + moveX, elementLeft)}px;
        height: ${getClampedHeight(elementHeight + moveY, elementTop)}px;
        top: ${elementTop}px;
        left: ${elementLeft}px;
        right:${getClampedDistance(elementRight - moveX, documentWidth - this.config.minWidth - elementLeft)}px;
        bottom:${getClampedDistance(elementBottom - moveY, documentHeight - this.config.minHeight - elementTop)}px;
        transition: unset;
      `;
        break;
      default:
        break;
    }

    this.element.style.cssText = cssText;
  };



  private mouseup = () => {
    this.element.style.transition = this.initStatus.transtion;
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
  }
}
