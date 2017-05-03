<template>
  <div id="app">
    <div class="index" v-show="isShowIndex">
      <v-header></v-header>
      <side-menu></side-menu>
      <router-view></router-view>
      <v-footer></v-footer>
    </div>
    <audio :scr="audio.src || (musicData[0]&&musicData[0].src) || defaultSrc" v-bind:autoplay="isPlaying" ref="audio" />
  </div>
</template>

<script>
import VHeader from '@/components/Header/Header'
import SideMenu from '@/components/AsideMenu/AsideMenu'
import VFooter from '@/components/Footer/Footer'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    VHeader, SideMenu, VFooter
  },
  computed: {
    ...mapState(['audio', 'isShowIndex', 'musicData', 'isPlaying', 'DOM'])
  },
  beforeCreate () {
    this.$store.dispatch('getData')
  },
  mounted () {
    this.$store.commit('findDOM', {'name': 'audio', dom: this.$refs.audio})
  }
}
</script>

<style lang='scss'>
@import './common/style/base.scss';

#app .index{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
