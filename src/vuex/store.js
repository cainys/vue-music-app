import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios)
Vue.use(Vuex)
const state = {
    musicData: [],
    skinColor: localStorage.skinColor || '#B72712',
    isShowIndex: true,
    isShowAsideMenu: false,
    isPlaying: false,
    isAnimation: false,
    isShowMiniMusic: true,
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
            {text: '发现', url: '/find'}
        ]
}
const mutations = {
    showIndex (state, flag) {
        state.isShowIndex = flag
    },
    deleteMusic (state, index) {
        state.musicData.splice(index, 1)
    },
    showAsideMenu (state) {
        state.isShowAsideMenu = !state.isShowAsideMenu
    },
    changeLinkBorderIndex (state, index) {
        state.linkBorderIndex = index
    },
    toggleMusic (state, index) {
        state.audio.name = state.musicData[index].name
        state.audio.src = state.musicData[index].src
        state.audio.musicImgSrc = state.musicData[index].musicImgSrc
        state.audio.index = index
    },
    play (state, flag) {
        state.isPlaying = flag
    },
    findDOM (state, payload) {
        state.DOM[payload.name] = payload.dom
    }
}
const actions = {
    getData ({ commit, state }) {
        if (localStorage.musics !== '[]' && localStorage.musics) {
            state.musicData = JSON.parse(localStorage.musics)
            return
        }
        return new Promise((resolve, reject) => {
            Vue.axios.get('/api/music-data')
            .then(res => {
                if (res.data.errno === 0) {
                    state.musicData = res.data.musicData
                    localStorage.musicData = JSON.stringify(state.musicData)
                }
            }).then(() => {
                commit('toggleMusic', 0)
            })
            resolve()
        })
    },
    play ({ commit, state }) {
        commit('play')
    }
}
const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
