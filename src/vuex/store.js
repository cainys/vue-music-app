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
    linkBorderIndex: 0,
    DOM: {},
    audio: {
        name: '',
        scr: '',
        musicImgSrc: '',
        index: 0
    },
    items: [
            {text: '学习', url: '/music-list'},
            {text: '发现', url: '/find'},
            {text: '一个', url: '/social'}
        ]
}
const mutations = {
    showAsideMenu (state) {
        state.isShowAsideMenu = !state.isShowAsideMenu
    },
    changeLinkBorderIndex (state, index) {
        state.linkBorderIndex = index
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
