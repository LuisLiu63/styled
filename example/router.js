/**
 * Author: luisliu
 * Description: 
 * Time: 2022-06-01 16:56:07
 * Contact: lc63msn@Hotmail.com
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: '/',
      component: () => import('./pages/home/index.vue')
    },
    {
      path: '/tool',
      component: () => import('./layout/index.vue'),
      redirect: '/tool/preview',
      children: [
        {
          path: 'preview',
          component: () => import('./components/colors.vue'),
        }
      ]
    },
    {
      path: '/demos',
      component: () => import('./layout/index.vue'),
      children: [
        {
          path: 'index',
          component: () => import('./pages/demos/index.vue'),
        }
      ]
    },
    {
      path: '/documents'
    }
  ]
})

export default router