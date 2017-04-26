<template>
  <div id="app">
    <v-header></v-header>
    <side-menu></side-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from '@/components/Header/Header'
import SideMenu from '@/components/AsideMenu/AsideMenu'
export default {
  name: 'app',
  components: {
    VHeader, SideMenu
  }
}
</script>

<style lang='scss'>
@import './common/style/base.scss';

#app{
  position:relative;
  height:100%;
}
</style>
