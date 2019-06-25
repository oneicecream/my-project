import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import axios from 'axios'

import router from './router'

import './styles/index.css'

// 配置 axios 的基础路径
// 发请求的时候就不需要每次都写 https://XXXX
// 例如我要请求登录，直接axios({ url:'/authorizations'})
// 路径最后的 /，多退少补
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

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
