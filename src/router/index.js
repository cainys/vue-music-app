import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import vHeader from '@/components/Header/header'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Header',
      component: vHeader
    }
  ]
})
