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
    component: () => import('@/views/layout/index.vue'),
    children:[
      {
        path: '',
        name: '模板打印',
        component: () => import('@/views/tempPrint/index.vue')
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