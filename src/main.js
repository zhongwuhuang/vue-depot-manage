// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import mock from './mock/mock.js'//此部分引入的是我们所编写的mockjs文档
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '../static/css/iconfont/iconfont.css'

// 全局引入公共方法
import Cookies from 'js-cookie'
Vue.prototype.Cookies = Cookies
import axios from 'axios'
Vue.prototype.axios = axios
import tools from './utils/tools.js'
Vue.prototype.tools = tools

import '@/permission' // permission control
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
