import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'

const routes : Array<RouteRecordRaw> =  [
  {
    path: '/',
    redirect: '/setting',
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/index',
    meta: { title: '设置', icon: 'setting' },
    children: [
      {
        path: 'index',
        name: 'SettingIndex',
        component: () => import(/* webpackChunkName: "page" */ '../views/Setting/index.vue'),
        meta: { title: '产品管理', icon: 'files' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/index',
    meta: { title: '表单展示', type: 'one', icon: 'calendar' },
    children: [
      {
        path: 'index',
        name: 'FormIndex',
        component: () => import(/* webpackChunkName: "page" */ '../views/Form/index.vue')
      }
    ]
  }
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/index',
  //   meta: { title: '列表展示', type: 'one', icon: 'calendar' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'TableIndex',
  //       component: () => import(/* webpackChunkName: "page" */ '../views/Form/index.vue')
  //     }
  //   ]
  // }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
