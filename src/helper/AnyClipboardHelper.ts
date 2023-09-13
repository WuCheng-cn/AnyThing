/**
 * # 剪贴板助手类
 */
export class AnyClipboardHelper {
  /**
   * # 复制文本到剪贴板(不使用execCommand)
   */
  static async copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("已成功复制到剪贴板");
    } catch (error) {
      console.error("复制失败:", error);
    }
  }
  
  /**
   * # 从剪贴板中读取文本
   */
  static async read() {
    try {
      const text = await navigator.clipboard.readText();
      console.log("从剪贴板中读取文本:", text);
      return text;
    } catch (error) {
      console.error("读取失败:", error);
    }
  }
}