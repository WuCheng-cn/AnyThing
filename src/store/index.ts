/*
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-09 10:00:41
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 10:54:28
 * @FilePath: \anything\src\store\index.ts
 * @Description: 全局数据管理中心
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
 */
import { useConfig } from "./config";

export default function useStore(){
  return {
    useConfig,
  }
}