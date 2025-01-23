import { createRouter, RouteRecordRaw, createWebHistory, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/desktop',
    name: '桌面',
    component: () => import('@/views/Desktop/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '/tempPrint',
        name: '模板打印',
        component: () => import('@/views/TempPrint/index.vue'),
      },
      {
        path: '/graphics',
        name: '图形引擎',
        component: () => import('@/views/GraphicsEngine/index.vue')
      },
      {
        path: '/codeEditor',
        name: '代码编辑器',
        component: () => import('@/views/CodeView/index.vue')
      },
      {
        path: '/cesium',
        name: 'GIS引擎',
        component: () => import('@/views/GIS/Cesium/index.vue')
      },
      {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/Demo/index.vue')
      },
      {
        path: '/threejs',
        name: 'threejs',
        component: () => import('@/views/Threejs/index.vue')
      },
      // 重定向
      {
        path: '/',
        redirect: '/login'
      },
    ]
  },
]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router