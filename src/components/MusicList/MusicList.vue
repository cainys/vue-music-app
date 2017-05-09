<template>
    <div class="music-list">
        <div class="music-item" v-for="(item, index) in musicData">
            <img :src="item.musicImgSrc" alt="music" class="music-img" />
            <span @click="toggleMusic(index)" class="music-name">{{(index+1) + '.&nbsp;' + item.name}}</span>
            <span class="del-icon"></span>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'MusicList',
    computed: {
        ...mapState(['musicData', 'isPlaying', 'DOM'])
    },
    methods: {
        // toggleMusic (index) {
        //     if (this.$store.state.audio.index === index) {
        //         console.log(index + '' + this.$store.state.audio.index)
        //         console.log(this.DOM.audio.paused)
        //         this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause()
        //         this.$store.commit('play', !this.isPlaying)
        //     } else {
        //         this.DOM.audio.play()
        //         this.$store.commit('play', true)
        //     }
        //     this.$store.commit('toggleMusic', index)
        // }
        toggleMusic (index) {
            if (this.$store.state.audio.index === index) {
                this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause()
                this.$store.commit('play', !this.isPlaying)
            } else {
                this.DOM.audio.play()
                this.$store.commit('play', true)
            }
            this.$store.commit('toggleMusic', index)
        }
    }
}
</script>
<style lang="scss" scoped>
.music-list{
    padding:4px 4px 0px;
    .music-item + .music-item{
        border-top: 1px solid rgba(0,0,0,.2);
    }
    .music-item{
        border:none;
        position: relative;
        padding: 4px 6px 0;
        margin-bottom: 4px;
        border-radius: 5px;
        cursor:pointer;
        .music-img{
            width:50px;
            height: 50px;
            border-radius: 5px;
        }
        span.music-name {
        display: inline-block;
        width: 65%;
        vertical-align: top;
        margin-top: 15px;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        padding-bottom: 20px;
      }

      span.del-icon {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 20px;
        width: 20px;
        height: 20px;
        background: url('./del.svg');
        background-size: contain;
        cursor: pointer;
      }

    }
}
</style>
