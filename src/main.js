import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import axios from 'axios'
import { getUser, removeUser } from '@/utils/auth'

import router from './router'

import './styles/index.css'

// 配置 axios 的基础路径
// 发请求的时候就不需要每次都写 https://XXXX
// 例如我要请求登录，直接axios({ url:'/authorizations'})
// 路径最后的 /，多退少补
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// axios 请求拦截器： axios 发出去的请求会先经过这里
axios.interceptors.request.use(config => { // >=200 && <400的状态码会进入这里
  const user = getUser()

  // confit 是本次请求相关的配置对象
  // 如果有 user 数据，则往本次请求中添加用户 token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // return config 是允许请求发送的开关
  // 我们可以在这之前进行一些业务逻辑操作
  return config
}, error => { // >=400的状态码会进入这里
  return Promise.reject(error)
})

// 响应拦截器  axios 收到的响应会先经过这里
axios.interceptors.response.use(response => {
  // response 就是响应结果对象
  // 这里将 response 原样返回，那么你发请求的地方受到的就是 response
  // 我们可以控制请求受到的响应数据格式
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => {
  // 如果用户 token 无效，让其跳转到登录页面
  if (error.response.status === 401) {
    // 清楚本地储存中的无效 token 的用户信息
    removeUser()

    // 跳转到用户登录页面
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.use(ElementUI)

// 所有组件都是 Vue 的实例
// 我们可以把一些需要在组件中频繁使用的成员放到 Vue.prototype 中

// Vue.prototype.foo = 'bar'

// 给Vue 原型对象扩展成员的时候，最好加上一个 $ 前缀， 避免和组件内部的数据成员产生冲突
// 几乎所有组件都要去发请求，这样配置完以后，我们在组建中发送请求就可以直接 this.$http({ method/ url...})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
