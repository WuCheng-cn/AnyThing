import { AnyDateTimeHelper } from '../helper/AnyDateTimeHelper'
/**
 * 日期格式化类型枚举
 */
export enum EDateFormatType {
  /**
   * yyyy-MM-dd hh:mm:ss
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_HH_MM_SS)
   * ```
   * @description
   * ```ts
   * // 2021-08-31 10:00:00
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_HH_MM_SS = 'yyyy-MM-dd hh:mm:ss',
  /**
   * yyyy-MM-dd hh:mm
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_HH_MM)
   * ```
   * @description
   * ```ts
   * // 2021-08-31 10:00
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_HH_MM = 'yyyy-MM-dd hh:mm',
  /**
   * yyyy-MM-dd
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD)
   * ```
   * @description
   * ```ts
   * // 2021-08-31
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD = 'yyyy-MM-dd',
  /**
   * yyyy-MM
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM)
   * ```
   * @description
   * ```ts
   * // 2021-08
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM = 'yyyy-MM',
  /**
   * yyyy
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY)
   * ```
   * @description
   * ```ts
   * // 2021
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY = 'yyyy',
  /**
   * yyyy年MM月dd日 hh时mm分ss秒
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_HH_MM_SS_CN)
   * ```
   * @description
   * ```ts
   * // 2021年08月31日 10时00分00秒
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_HH_MM_SS_CN = 'yyyy年MM月dd日 hh时mm分ss秒',
  /**
   * yyyy年MM月dd日 hh时mm分
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_HH_MM_CN)
   * ```
   * @description
   * ```ts
   * // 2021年08月31日 10时00分
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_HH_MM_CN = 'yyyy年MM月dd日 hh时mm分',
  /**
   * yyyy年MM月dd日
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_CN)
   * ```
   * @description
   * ```ts
   * // 2021年08月31日
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_CN = 'yyyy年MM月dd日',
  /**
   * yyyy年MM月
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_CN)
   * ```
   * @description
   * ```ts
   * // 2021年08月
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_CN = 'yyyy年MM月',
  /**
   * yyyy年
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_CN)
   * ```
   * @description
   * ```ts
   * // 2021年
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_CN = 'yyyy年',
  /**
   * MM月dd日
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.MM_DD_CN)
   * ```
   * @description
   * ```ts
   * // 08月31日
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  MM_DD_CN = 'MM月dd日',
  /**
   * hh时mm分ss秒
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.HH_MM_SS_CN)
   * ```
   * @description
   * ```ts
   * // 10时00分00秒
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  HH_MM_SS_CN = 'hh时mm分ss秒',
  /**
   * hh时mm分
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.HH_MM_CN)
   * ```
   * @description
   * ```ts
   * // 10时00分
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  HH_MM_CN = 'hh时mm分',
  /**
   * yyyy/MM/dd hh:mm:ss
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_HH_MM_SS_SLASH)
   * ```
   * @description
   * ```ts
   * // 2021/08/31 10:00:00
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_HH_MM_SS_SLASH = 'yyyy/MM/dd hh:mm:ss',
  /**
   * yyyy/MM/dd hh:mm
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_HH_MM_SLASH)
   * ```
   * @description
   * ```ts
   * // 2021/08/31 10:00
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_HH_MM_SLASH = 'yyyy/MM/dd hh:mm',
  /**
   * yyyy/MM/dd
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_DD_SLASH)
   * ```
   * @description
   * ```ts
   * // 2021/08/31
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_DD_SLASH = 'yyyy/MM/dd',
  /**
   * yyyy/MM
   * @example
   * ```ts
   * AnyDateTimeHelper.format(new Date(), EDateFormatType.YYYY_MM_SLASH)
   * ```
   * @description
   * ```ts
   * // 2021/08
   * ```
   * @see {@link AnyDateTimeHelper.format}
   */
  YYYY_MM_SLASH = 'yyyy/MM',
}
