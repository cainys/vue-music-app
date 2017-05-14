import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MusicList from '@/components/MusicList/MusicList'
import Play from '@/components/Play/Play'
import Find from '@/components/Find/Find'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/music-list',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    }
  ]
})
