import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   component: () => import('@/views/home/index.vue')
    // },
    { // layout 显示到根组件的路由出口
      // name: 'layout',  // 使用 JavaScript 命名路由导航不会渲染默认子路由
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

// 全局前置收尾
// 当你访问路由页面的时候，会先进入这里
// to 要去哪里的相关参数
// from 来自哪里的相关数据
// next 允许通过的方法
router.beforeEach((to, from, next) => {
  // 路由导航前开启进度条
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')
  if (to.path !== '/login') {
    // 非登录页
    //   没有登录，跳转到登录页
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      //   登录了，允许通过
      next()
    }
  } else {
    // 登录页面
    //  没有登录，允许通过
    if (!userInfo) {
      next()
    } else {
    //  登陆了，不允许通过
    // next(false) // 终端当前导航
    // next()
    // next({ name: 'home'})
      window.location.href = '/#/' // 跳转页面
      window.location.reload() // 强制页面刷新一次
    }
  }
})

router.afterEach((to, from) => {
  // 路由导航完成，结束进度条
  nprogress.done()
})

export default router
