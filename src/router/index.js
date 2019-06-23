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
    { // layout 显示到根组件的路由出口
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      // 嵌套路由：
      // 所有 children 路由都显示到父路由的 router-view 中
      children: [
        {
          name: 'home',
          path: '', // 父路由的默认内容
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish', // 父路由的默认内容
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      // 路由懒加载
      component: () => import('@/views/login')
    }
  ]
})
