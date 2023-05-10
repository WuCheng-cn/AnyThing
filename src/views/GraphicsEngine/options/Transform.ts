export const TransformOption ={
  resizing: {
    enabled: true, // 是否支持调整节点大小
    minWidth: 40, // 最小的调整宽度
    minHeight: 40, // 最小的调整高度
    maxWidth: Infinity, // 最大的调整宽度
    maxHeight: Infinity, // 最大的调整高度
    orthogonal: true, // 是否显示中间调整点
    restrict: true, // 调整大小边界限制
    autoScroll: false, // 拖动位置超过画布时是否自动滚动画布
    preserveAspectRatio: true, // 调整大小过程中是否保持节点的宽高比例
    allowReverse: false, // 到达最小宽度或者高度时是否允许控制点反向拖动
  },
}