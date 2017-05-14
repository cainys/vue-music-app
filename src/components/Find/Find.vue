<template>
    <div class="find">
        <div class="search-input">
            <div class="input">
                <i class="icon-search"></i>
                <input v-model="keywords" type="text" placeholder="搜索" @keyup.enter="" @focus="" :class="{'input-focus': !isShowHot}" />
                <i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i>
                <div class="cancel-btn" @click="isShowHot = true" v-show="!isShowHot">取消</div>
            </div>
        </div>
        <div v-if="isShowHot" class="hot">
            热门搜索
            <div class="keywords">
            <div v-for="item of hotKeywords"  @click="toSearch(item)" class="keyword">{{item}}</div>
            </div>
        </div>   
      </div>
</template>
<script>
import { mapState } from 'vuex'
export default{
    name: 'find',
    beforeCreate () {
        this.$store.commit('showMiniMusic', true)
    },
    created () {
        this.axios.get('/api/hot').then(res => {
            this.hotKeywords = res.data
            })
    },
    mounted () {
        this.$store.commit('changeLinkBorderIndex', 1)
    },
    data () {
        return {
            keywords: '',
            hotKeywords: [],
            isShowHot: true,
            musicList: [],
            playIndex: '',
            isLoading: false,
            isShowHistory: false,
            searchHistory: (localStorage.searchHistory && JSON.parse(localStorage.searchHistory)) || []
            }
    }
}
</script>
<style lang="scss" scoped>
.find{
    flex: 8;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    .search-input{
        background: rgba(0, 0, 0, 0.1);
        position: relative;
        text-align: center;
        border-bottom: 1px solid #eee;
        .input{
            position: relative;
            width: 90%;
            height: 35px;
            margin: 20px auto;
            text-align: left;
            i.icon-search{
                position: absolute;
                top: 7px;
                left: 6px;
                display: inline-block;
                height: 20px;
                width: 20px;
                background: url('./find.svg') no-repeat;
                background-size: contain;
          }
          input {
            border-radius: 3px;
            border: none;
            padding: 0 34px;
            width: 100%;
            height: 100%;
            font-size: 1rem;
            outline: none;
        }
        i.icon-cancel {
          position: absolute;
          top: 7px;
          right: 21%;
          display: inline-block;
          height: 20px;
          width: 20px;
          background: url('./cancel.svg') no-repeat;
          background-size: contain;
        }
        .input-focus {
          width: 80%;
        }
        .cancel-btn {
          vertical-align: top;
          padding: 7px 10px;
          height: 100%;
          background-color: none;
          display: inline-block;
        }
        }
    }
    .hot{
        flex: 8;
        padding: 8px;
        .keywords{
            display: flex;
            flex-wrap:wrap;
            padding: 10px 0 0 30px;
            .keywords:hover{
                border-bottom: 1px solid orangered;
            }
            div{
                text-align: center;
                width: 25%;
                padding: 5px;
                border: 1px solid gray;
                margin: 0 8% 10px 0;
                border-radius: 20px;
                cursor: pointer;
            }
            div:nth-of-type(1){
                border-color: red;
                color: red;
            }
        }
    }
}
</style>
