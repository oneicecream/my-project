import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   component: () => import('@/views/home/index.vue')
    // },
    {
      name: 'login',
      path: '/login',
      // 路由懒加载
      component: () => import('@/views/login/index.vue')
    },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout/index.vue')
    }
  ]
})
