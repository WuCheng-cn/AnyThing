import { WidgetConfigEntity } from '@/entity/graph/WidgetConfigEntity';
import { EWigetFormConfigType } from '@/enum/EWigetFormConfigType';
import { AnyComponentHelper } from '@/helper/AnyComponentHelper';
import { InWidgetFormConfig } from '@/interface/graph/InWidgetFormConfig';

const loader = () => import('@/views/GraphicsEngine/component/WidgetForm/NameConfig.vue')

export const WidgetBaseConfig: InWidgetFormConfig = {
    title: '基础配置',
    disabled: false,
    type: EWigetFormConfigType.STYLE,
    entity: WidgetConfigEntity,
    component: AnyComponentHelper.asyncComponent(loader),
    data: new WidgetConfigEntity(),
}
