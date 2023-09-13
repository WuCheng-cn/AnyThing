export function AnyDialogProps(){
  return {
    /**
     * 确认事件
     * @description 调用后关闭弹窗
     * @description 如过配置了表单的ref，则只有表单校验通过后才会调用onConfirm
     */
    onConfirm: {
      type: Function,
      default: () => () => {
        // console.log('On Confirm')
      },
    }
  }
}