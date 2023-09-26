import { EChartsOption, LegendComponentOption, SeriesOption, TitleComponentOption, XAXisComponentOption, YAXisComponentOption } from "echarts";
import { BaseEntity } from "../base/BaseEntity";
import { Expose } from "class-transformer";
type LineChartsKey = 'title' | 'legend' |   'xAxis' | 'yAxis' | 'series' 
/**
 * # 基础折线图实体类
 */
export class LineChartsEntity extends BaseEntity implements Required<Pick<EChartsOption,LineChartsKey>> {
  @Expose()
  title!: TitleComponentOption | TitleComponentOption[];
  @Expose()
  legend!: LegendComponentOption | LegendComponentOption[];
  @Expose()
  xAxis!: XAXisComponentOption | XAXisComponentOption[];
  @Expose()
  yAxis!: YAXisComponentOption | YAXisComponentOption[];
  @Expose()
  series!: SeriesOption | SeriesOption[];
}