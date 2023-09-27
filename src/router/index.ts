import { createRouter, RouteRecordRaw ,createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout/index.vue'),
    children:[
      {
        path: '',
        name: '模板打印',
        component: () => import('@/views/TempPrint/index.vue')
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
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/Demo/index.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router