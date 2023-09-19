import Demo from './Demo/index'
import LineChart from './LineChart/index'
import WidgetImage from './WidgetImage/index'
import Screen from './Screen/index'
import { InRegistItem } from '@/interface/graph/InRegistItem'

const Registry:InRegistItem[] = [
  Demo,
  Screen,
  LineChart, 
  WidgetImage,
]

export {
  Registry
}