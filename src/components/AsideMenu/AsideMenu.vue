<template>
    <transition name="fadeIn" mode="">
        <div class="aside-menu" :class="{'show':isShowAsideMenu}">
            <div class="aside">
                <div class="info">
                    <div><img src="../../assets/avatar.jpg" /></div>
                    <div class="about">
                        gsy
                    </div>
                </div>
                <div class="setting">
                    <div class="content">
                        <ul>
                            <li><i class="icon-msg"></i>我的消息</li>
                            <li><i class="icon-vip"></i>会员中心</li>
                            <li><i class="icon-shop"></i>商城</li>
                            <li><i class="icon-music"></i>在线听歌免流量</li>
                        </ul>
                        <ul>
                            <li><i class="icon-friend"></i>我的好友</li>
                            <li><i class="icon-near"></i>附近的人</li>
                        </ul>
                        <ul>
                            <li @click.stop.prevent="$store.commit('showIndex', false)"><i class="icon-skin"></i>个性换肤</li>
                            <li @click=""><i class="aboutme"></i>关于</li>
                        </ul>
                    </div>
                </div>            
            </div>
        <div class="mask" @click="showAsideMenu" ></div>
        </div>

    </transition>

</template>
<script>
import {mapState} from 'vuex'
export default{
    name: 'AsideMenu',
    computed: {
        ...mapState(['isShowAsideMenu'])
    },
    methods: {
        showAsideMenu () {
            this.$store.commit('showAsideMenu')
        }
    }
}
</script>
<style lang="scss">
.fadeIn-enter-active {
  transition: all .4s ease;
}
.fadeIn-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fadeIn-enter, .fadeIn-leave-active {
  transform: translateX(-250px);
  opacity: 0;
}

.aside-menu{
    transition: .3s ease;
    /*transform: translate(-60%);*/
    &.show{
        left: 0;
    }
    width: 100%;
    height:100%;
    position:absolute;
    left: -100%;
    bottom:0;
    right:0;
    top:0;
    display: flex;
    z-index:1;
    .aside{
        width: 60%;
        min-width:192px;
        .info{
            padding:20px 0 10px 10px;
            background: #B72712;
            box-shadow:2px 0 5px darkgray;
            text-align: center;
            flex:1;
            img{
                width:100px;
                height:95px;
                border-radius:50%;
            }
        }
        .setting{
            position: relative;
            flex:5;
            height: 100%;
            background: #eee;
            box-shadow:2px 0 5px darkgray;
            .content{
                ul{
                    list-style: none;
                    padding:.5rem 1.5rem;
                    li{
                        font-size: 1rem;
                        height: 2rem;
                    }
                }
            }
        }
    }
    
}
.mask{
    width: 40%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    
}

i{
    display: inline-block;
    height: 20px;
    width: 20px;
    margin-right: 10px;
    vertical-align: text-bottom;
}
i.icon-skin {
    background: url('./icon/skin.svg') no-repeat;
    background-size: contain;
}
i.icon-msg {
    background: url('./icon/msg.svg') no-repeat;
    background-size: contain;
}
i.icon-vip {
    background: url('./icon/vip.svg') no-repeat;
    background-size: contain;
}
i.icon-shop {
    background: url('./icon/shop.svg') no-repeat;
    background-size: contain;
}
i.icon-music {
    background: url('./icon/music.svg') no-repeat;
    background-size: contain;
}
i.icon-friend {
    background: url('./icon/friend.svg') no-repeat;
    background-size: contain;
}
i.icon-near {
    background: url('./icon/near.svg') no-repeat;
    background-size: contain;
}

i.aboutme {
    display: inline-block;
    margin-right: 2px;
    width: 20px;
    height: 20px;
    background: url('./icon/about.svg') no-repeat;
    background-size: contain;
}
</style>
