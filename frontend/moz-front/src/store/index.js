import Vue from 'vue'
import Vuex from 'vuex'

import blogs from './modules/blogs'
import blogDetail from './modules/blogDetail'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    blogs,
    blogDetail
  }
})
