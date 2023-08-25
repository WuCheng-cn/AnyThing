export const SelectionOption = {
  enabled: true,
  className: 'any-selection',//	选框的自定义 class 名称
  multiple: true,//是否启用点击多选，启用后按住 ctrl 或 command 键点击节点实现多选
  rubberband: false,//是否启用框选节点功能
  showNodeSelectionBox: true,//	是否显示节点的选择框
  showEdgeSelectionBox: false,//	是否显示边的选择框
  pointerEvents: 'auto',//	如果打开 showNodeSelectionBox 时，会在节点上方盖一层元素，导致节点的事件无法响应，此时可以配置 pointerEvents: none 来解决，默认值是 auto
  movable: true,//	拖动选框时框选的节点是否一起移动
  strict: false,//	是否严格按照节点的位置判断是否选中，如果为 false，则只要节点的中心点在选框内就算选中，默认值为 false
}