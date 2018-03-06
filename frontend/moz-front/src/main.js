// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

if (process.env) {
  require('../mock/mock')
}
require('bootstrap-vue/dist/bootstrap-vue.min.css')
require('bootstrap/dist/css/bootstrap.min.css')
require('./css/common.css')
require('./assets/icon/iconfont.css')
Vue.config.productionTip = false
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
