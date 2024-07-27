import { LineChartConfigEntity } from '@/entity/graph/LineChartConfigEntity';
import { EWigetFormConfigType } from '@/enum/EWigetFormConfigType';
import { AnyComponentHelper } from '@/helper/AnyComponentHelper';
import { InWidgetFormConfig } from '@/interface/graph/InWidgetFormConfig';

const loader = () => import('@/views/GraphicsEngine/component/WidgetForm/LineChartConfig.vue')

export const WidgetChartDataSetConfig: InWidgetFormConfig = {
    title: '折线图配置',
    disabled: false,
    type: EWigetFormConfigType.DATA,
    entity: LineChartConfigEntity,
    component: AnyComponentHelper.asyncComponent(loader),
    data: new LineChartConfigEntity(),
}
