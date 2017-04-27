import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MusicList from '@/components/MusicList/MusicList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicList',
      component: MusicList
    }
  ]
})
