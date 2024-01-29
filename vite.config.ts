import vue from '@vitejs/plugin-vue'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
// 依赖外部化，不参与打包
import { viteExternalsPlugin } from 'vite-plugin-externals'
// vite插入script标签插件
import { insertHtml, h } from 'vite-plugin-insert-html'
// vite静态文件拷贝插件
import { viteStaticCopy } from 'vite-plugin-static-copy'
// vite打包压缩插件
import compress from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    viteExternalsPlugin({
      // key 是要外部化的依赖名，value 是全局访问的名称，这里填写的是 'Cesium'
      // 意味着外部化后的 cesium 依赖可以通过 window['Cesium'] 访问；
      // 支持链式访问，参考此插件的文档
      cesium: 'Cesium',
    },{
      disableInServe:true//开发环境下不将依赖外部化
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/Cesium.js', // 要复制的文件路径
          dest: 'libs/cesium/' // 打包后根路径的相对路径
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/Assets/*',
          dest: 'libs/cesium/Assets/'
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/ThirdParty/*',
          dest: 'libs/cesium/ThirdParty/'
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/Workers/*',
          dest: 'libs/cesium/Workers/'
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/Widgets/*',
          dest: 'libs/cesium/Widgets/'
        },
      ]
    }),
    insertHtml({
      body: [// 在标签中插入引入Cesium.js的标签
        h('script', {
          src: 'libs/cesium/Cesium.js'
        })
      ]
    })

  ],
  resolve: {
    alias: {
      '@': '/src/'
    }
  },
  optimizeDeps: {
    exclude: ['@antv/x6-vue-shape'],
  },
  base: './', // 打包路径
  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    hmr: true, // 热更新
  }
})