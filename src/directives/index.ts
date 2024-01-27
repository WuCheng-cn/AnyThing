/*
 * @Author: 吴成 1965417564@qq.com
 * @Date: 2023-01-09 13:29:33
 * @LastEditors: 吴成 1965417564@qq.com
 * @LastEditTime: 2023-01-09 14:26:21
 * @FilePath: \anything\src\directives\index.ts
 * @Description: 全局指令注册
 * 
 * Copyright (c) 2023 by 吴成 1965417564@qq.com, All Rights Reserved. 
 */
import { App } from "vue";
import { resize } from "./resize";
import { layzRender } from "./layzRender";

export const directivePlugin = {
  install(app:App<Element>){    
    app.directive('resize',resize)
    app.directive('layzRender',layzRender)
  }
}