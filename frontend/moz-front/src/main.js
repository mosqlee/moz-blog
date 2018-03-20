// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import commonFilters from './filter/index'
if (process.env) {
  require('../mock/mock')
}
require('bootstrap-vue/dist/bootstrap-vue.min.css')
require('bootstrap/dist/css/bootstrap.min.css')
require('./css/common.css')
require('./assets/icon/iconfont.css')
Vue.config.productionTip = false
Vue.use(Vuex)
Object.keys(commonFilters).forEach(function (key, index, arr) {
  Vue.filter(key, commonFilters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
