/*
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-09 10:00:41
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 11:16:06
 * @FilePath: \anything\src\store\index.ts
 * @Description: 全局数据
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
 */
import { GraphConfig } from './GraphConfig'
import { AppConfig } from './AppConfig'
import { DesktopConfig } from './DesktopConfig'

/**
 * # 全局配置文件数据中心
 */
export const useConfig = ()=>{
  return {
    GraphConfig:GraphConfig(),
    AppConfig:AppConfig(),
    DesktopConfig:DesktopConfig(),
  }
}

