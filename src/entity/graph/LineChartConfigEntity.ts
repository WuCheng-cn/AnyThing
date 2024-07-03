import { Axis } from "echarts";
import { BaseEntity } from "../base/BaseEntity";
import { Expose } from "class-transformer";
import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { FieldName } from "@/decorator/FieldName";
/**
 * # 折线图配置
 */
export class LineChartConfigEntity extends AnyBaseModel {

  @FieldName('x轴类型')
  @Expose()
  xAxisType: Axis['type'] = 'category';

  @FieldName('y轴类型')
  @Expose()
  yAxisType: Axis['type'] = 'value';

  @FieldName('y轴名称')
  @Expose()
  xAxisName: string = 'xAxis';

  @FieldName('x轴名称')
  @Expose()
  yAxisName: string = 'yAxis';

  @FieldName('数据集')
  @Expose()
  dataSet: echarts.EChartsOption['dataset'] = {
    source: []
  };

}