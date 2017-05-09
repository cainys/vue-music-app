<template>
    <div class="play">
        <header :style="{backgroundColor: skinColor}" class="header">
            <div class="back">
                <div class="icon-back"><i @click=""></i></div>
            </div>
            <div class="title">
                {{audio.name}}
            </div>
            <div class="list">

            </div>
        </header>
        <div class="content"></div>
        <footer class="footer"></footer>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default{
    name: 'play',
    computed: {
        ...mapState(['skinColor', 'audio'])
    },
    mounted () {
        this.nativeAudio = document.querySelector('audio')
        this.nativeAudio.addEventListener('play', () => {
            this.totalTime = this.transformTime(this.nativeAudio.duration)
            this.now = this.nativeAudio.currentTime
            setInterval(() => {
                this.now = this.nativeAudio.currentTime
            }, 1000)
            this.now = this.nativeAudio.currentTime
            console.log('1')
        })
    },
    data () {
        return {
            now: 0,
            nativeAudio: {},
            totalTime: '0:00'
        }
    }
}
</script>
<style lang="scss">
    .play{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        .header{
            position: relative;
            z-index: 1;
            flex: .9;
            display: flex;
            .back{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon-back i {
                    display: inline-block;
                    background: url('./back.svg') no-repeat;
                    background-size: contain;
                    width: 22px;
                    height: 22px;
                    vertical-align: bottom;
                    cursor: pointer;
                }            
            }
        }
    }
</style>
