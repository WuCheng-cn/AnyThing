import * as echarts from 'echarts'
/**
 * # echarts 助手类
 */
export class AnyEchartsHelper{
  /**
   * # x轴配置
   */
  xAxis: echarts.EChartsOption['xAxis'] = {
    type: 'category',
    data: []
  }

  /**
   * # y轴配置
   */
  yAxis: echarts.EChartsOption['yAxis'] = {
    type: 'value'
  }

  /**
   * # 图表配置
   */
  series: echarts.EChartsOption['series'] = []

  /**
   * # 数据集配置
   */
  dataSet: echarts.EChartsOption['dataset'] = {
    source: []
  }
  
  /**
   * # 创建echarts实例
   * @param container 容器
   */
  static create(container: HTMLElement): any {
    return echarts.init(container);
  }

  setxAxis(val: echarts.EChartsOption['xAxis']){
    this.xAxis = val;
    
  }
  
}