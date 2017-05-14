<template>
    <div :style="{backgroundColor:skinColor}" class="header">
        <div class="name">
            <span @click="showAsideMenu" class="func"><i class="icon-func"></i></span>
            <p>网易云</p>
            <span @click="" class="search"><i class="icon-search"></i></span>
        </div>
        <div class="tab">
            <div v-for="(item,index) in items" :class="{link:linkBorderIndex == index}" class="item" @click="changeLinkBorderIndex(index)">
                <router-link :to="item.url">{{item.text}}</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
    name: 'vHader',
    computed: {
        ...mapState(['linkBorderIndex', 'items', 'skinColor', 'isShowAsideMenu'])
    },
    methods: {
        changeLinkBorderIndex (index) {
            console.log(index)
            this.$store.commit('changeLinkBorderIndex', index)
        },
        showAsideMenu () {
            this.$store.commit('showAsideMenu')
        }
    },
    mounted () {
        console.log(this.linkBorderIndex)
    }
}
</script>
<style lang="scss" scoped>
.header{
    background-color: #B72712;
    color:white;
    width: 100%;

    .name{
        display: flex;
        justify-content: space-between;
        text-align:center;
        padding:10px 0;
        border-bottom:1px solid rgba(255,255,255,.2);
        .func{
            flex: 1;
            position:relative;
            .icon-func{
                position:absolute;
                display:inline-block;
                height:20px;
                width:20px;
                bottom:0;
                left:15px;
                background:url('./func.svg') no-repeat;
                background-size:contain;
                cursor:pointer;
            }
        }
        p{
            flex:1;
        }
        .search{
            flex:1;
            position:relative;
            .icon-search{
                position:absolute;
                width:20px;
                height:20px;
                bottom:0;
                right:15px;
                background:url('./search.svg') no-repeat;
                background-size:contain;
                display:inline-block;
                cursor:pointer;
            }
        }
    }
    .tab{
        display: flex;
        border-bottom: 1px solid #9E9E9E;
        a{
            display:inline-block;
            width:50%;
        }
        a::after{
            background-color: rgba(255, 255, 255, .2);
            height: 1px;
            bottom: -2px;
        }
        .item{
            display: inline-block;
            flex: 1;
            text-align: center;
            padding: 10px 0;
        }
        .link{
            font-weight: blod;
            color: #bdbdbd;
            border-bottom: 1px solid #fff;
        }
    }
}
</style>
