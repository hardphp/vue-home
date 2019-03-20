import Vue from 'vue'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import 'amfe-flexible'

import App from './App'
import router from './router'
import store from './store'

import './errorLog'
import './permission'
// import './mock'

import * as filters from './filters'

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
