<template>
  <div id="app">
    <!--主界面-->
    <transition name="show">
      <div v-show="isShowIndex">
        <v-header></v-header>
        <side-menu></side-menu>
        <router-view></router-view>
        <v-footer></v-footer>
      </div>
    </transition>

    <audio v-bind:src="audio.src || (musicData[0]&&musicData[0].src) || defaultSrc" v-bind:autoplay="isPlaying" ref="audio"></audio>
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
    ...mapState(['isShowIndex', 'audio', 'musicData', 'isPlaying'])
  },
  data () {
    return {
      defaultSrc: 'http://m2.music.126.net/K1SFXCvWf8BO9VEpSvx2ew==/7967061257205150.mp3'
    }
  },
  beforeCreate () {
    this.$store.dispatch('getData')
  },
  mounted () {
    this.$store.commit('findDOM', {name: 'audio', dom: this.$refs.audio})
  }
}
</script>

<style lang='scss'>
@import './common/style/base.scss';
.show-enter-active {
  transition: all .4s ease;
}
.show-leave-active {
  transition: all 0 ease-out;
}
.show-enter, .show-leave-active {
  transform: translateX(-350px);
  opacity: 0;
}
#app{
  position:relative;
  height:100%;
}
</style>
