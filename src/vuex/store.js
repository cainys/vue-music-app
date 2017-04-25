import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    musicData: [],
    skinColor: localStorage || '#B72712',
    isShowIndex: true,
    isShowAsideMenu: false,
    isPlaying: false,
    isAnimation: false,
    isShowMiniMusic: false,
    isShowAbout: false,
    linkBorderIndex: '',
    DOM: {},
    audio: {
        name: '',
        scr: '',
        musicImgSrc: '',
        index: 0
    }
}
const mutations = {
    showAsideMenu (state) {
        state.isShowAsideMenu = !state.isShowAsideMenu
    }
}
const actions = {}
const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
