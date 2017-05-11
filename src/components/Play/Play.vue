<template>
    <div class="play">
        <header :style="{backgroundColor: skinColor}" class="header">
            <div class="back">
                <div class="icon-back"><i @click=""></i></div>
            </div>
            <div class="title">
                <div class="name">{{audio.name || musicData[0]&&musicData[0].name}}</div>
            </div>
            <div class="list">
                <!--<div class="list-icon"><i @click="isShowMusicList = !isShowMusicList"></i></div>-->
                <div class="list-icon"><i @click="showList"></i></div>
            </div>
        </header>
        <div class="content">
            <transition name="fade">
                <!--<div class="music-list" v-show="isShowMusicList">-->
                <div class="music-list" ref="list" v-show="isShowMusicList">
                    <ul>
                        <li @click="toggleMusic(index)" v-for="(item,index) in musicData" :class="{activeColor:index===audio.index}">{{index+1}} - {{item.name}}</li>
                    </ul>
                </div>
            </transition>
            <img @click="isShowMusicList = false" :src="audio.musicImgSrc || musicData[0]&&musicData[0].musicImgSrc" :alt="audio.name || musicData[0]&&musicData[0].name" />
            <div class="img">
                <img :src="audio.musicImgSrc || musicData[0]&&musicData[0].musicImgSrc" :alt="audio.name || musicData[0]&&musicData[0].name" />
            </div>
            <div class="progress">
                <div class="start-time">
                    {{transformTime(now)}}
                </div>
                <div class="progress-bar" ref="progressBar">
                    <div class="now" ref="now" :style="{width: (now / nativeAudio.duration).toFixed(3) * 100 + '%'}"></div>
                </div>
                <div class="end-time">
                    {{totalTime}}
                </div>
            </div>
        </div>
        <footer class="footer" :style="{backgroundColor:skinColor}">
            <div class="prev">
                <div class="icon-prev"><i></i></div>
            </div>
            <div class="play">
                <div class="icon-play"><i @click="play" :class="[isPlaying ? 'pause-icon' : 'play-icon']"></i></div>
            </div>
            <div class="next">
                <div class="icon-next"><i></i></div>
            </div>
        </footer>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default{
    name: 'play',
    computed: {
        ...mapState(['skinColor', 'audio', 'musicData', 'isPlaying', 'DOM'])
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
            totalTime: '0:00',
            isShowMusicList: false
        }
    },
    methods: {
        transformTime (time) {
            let m, s
            m = Math.floor(time / 60)
            m = m.toString().length === 1 ? ('0' + m) : m
            s = Math.round(time % 60)
            s = s.toString().length === 1 ? ('0' + s) : s
            console.log(m + ':' + s)
            return m + ':' + s
        },
        toggleMusic (index) {
            this.$store.commit('toggleMusic', index)
            this.$store.commit('play', true)
            this.isShowMusicList = false
        },
        play () {
            this.$store.commit('play', !this.isPlaying)
            !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play()
        },
        showList () {
            if (this.isShowMusicList) {
                this.$refs.list.style.bottom = '-57.5%'
            } else {
                this.$refs.list.style.bottom = '-12.5%'
            }
            this.isShowMusicList = !this.isShowMusicList
        }
    }
}
</script>
<style lang="scss" scoped>
    .play{
        display: flex;
        flex-direction: column;
        /*background: #eee;*/
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
           .title{
               flex:5;
               display: flex;
               align-items: center;
               justify-content: center;
               .name{
                   color: #fff;
                   text-align: center;
                   width: 250px;
                   overflow: hidden;
                   text-overflow: ellipse;
                   white-space: nowrap;
               }

           }
           .list{
               flex: 1;
               display: flex;
               justify-content: center;
               align-items: center;
               .list-icon i {
                   display: inline-block;
                   width: 22px;
                   height: 22px;
                   background: url('./list.svg') no-repeat;
                   background-size: contain;
                   vertical-align: bottom;
                   cursor: pointer;                  
               }
           }
        }
        .content{
            position: relative;
            flex: 9;
            display: flex;
            justify-content: center;
            align-items: center;
            .progress{
                position:absolute;
                width:100%;
                bottom:10px;
                display: flex;
                justify-content:space-between;
                align-items:center;
                text-align: center;
                /*background:rgba(255,255,255,0.8);*/
                .start-time{
                    flex: 1;
                    
                }
                .progress-bar{
                    position:relative;
                    width: 100%;
                    height: 4px;
                    background-color:rgba(255, 255, 255, .8);
                    border-radius: 2px;
                    flex: 4;
                    cursor: pointer;
                    
                    .now {
                        position: absolute;
                        left: 0;
                        display: inline-block;
                        max-width: 100%;
                        width: 100%;
                        height: 100%;
                        background-color: #31c27c;
                    }
                    .now::after {
                        content: "";
                        position: absolute;
                        left: 100%;
                        width: 2px;
                        height: 120%;
                        background-color: white;
                    }
                }
                .end-time {
                    flex: 1;
                }
            }
            .music-list{
                position: absolute;
                border-radius-top-left: 5px;
                border-radius-top-right: 5px;
                left:0px;
                bottom:-57.5%;
                width:100%;
                height:45%;
                z-index:10;
                background:rgba(255,255,255,1);
                transition: all .8s ease;
                .fade-enter-active{
                    transition: all .8s ease;
                }
                .fade-leave-active{
                    transition: all .8s ease;
                }
                /*.fade-enter,.fade-leave-active{
                    opacity: 0;
                }*/
                ul{                
                    li{
                        padding-left: 10px;
                        height:30px;
                        line-height:30px;
                        border-bottom:1px solid #999;
                        &.activeColor{
                            color:red;
                        }
                    }
                }
            }
            img{
                position: absolute;
                height:100%;
                width:100%;
                z-index: 0;
                filter:brightness(50%) blur(5px) ;
            }
            .img{
                width: 300px;
                height: 300px;
                img{
                    position:relative;
                    filter:blur(0);
                    z-index:2;
                    width:100%;
                    height:100%;
                    border-radius:50%;
                }
            }
        }
        .footer{
            flex: 1;
            display: flex;
            .prev{
                flex: 1;
                display:flex;
                justify-content: flex-end;
                align-items: center;
                .icon-prev i{
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    background: url('./prev.png') no-repeat;
                    background-size: contain;
                }
            }
            .play{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                .icon-play i{
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    &.play-icon{
                        background: url('./play.png') no-repeat;
                        background-size: contain;
                    }
                    &.pause-icon {
                       background: url('./pause.png') no-repeat;
                       background-size: contain;
                    }
                }
            }
            .next{
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .icon-next i{
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    background: url('./next.png') no-repeat;
                    background-size: contain;
                }

            }
        }
    }
</style>
