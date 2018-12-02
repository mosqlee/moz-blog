import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Category from '@/components/Category'
import About from '@/components/About'
import Blog from '@/components/Blog'
import Naught from '@/components/Naught'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      // redirect: '/home',
      name: 'Hello',
      component: Index,
      children: [
        { path: '/home/:page', component: Home },
        { path: '/about', component: About },
        { path: '/category', component: Category },
        {path: '/blogDetail/:id', name: 'blogDetail', component: Blog},
        {path: 'Naught', name: 'Naught', component: Naught}
      ]
    }
  ]
})
