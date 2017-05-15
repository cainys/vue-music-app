<template>
    <div class="find">
        <div class="search-input">
            <div class="input">
                <i class="icon-search"></i>
                <input v-model="keywords" type="text" placeholder="搜索" @keyup.enter="toSearch(keywords)" @focus="inputFocus()" :class="{'input-focus': !isShowHot}" />
                <i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i>
                <div class="cancel-btn" @click="showHot()" v-show="!isShowHot">取消</div>
            </div>
        </div>
        <div v-if="isShowHot" class="hot">
            热门搜索
            <div class="keywords">
            <div v-for="item of hotKeywords"  @click="toSearch(item)" class="keyword">{{item}}</div>
            </div>
        </div>  
        <div v-else class="search-list" @touchmove="$store.commit('showMiniMusic', false)">
        <div v-show="isShowHistory" v-for="(item, index) of searchHistory" class="history">
          <div class="icon"><i class="icon-history"></i></div>
          <div @click="toSearch(item)" class="word">{{item}}</div>
          <div class="icon"><i @click="searchHistory.splice(index, 1)" class="icon-del"></i></div>
        </div>

        <div v-show="isShowHistory&&searchHistory.length" @click="searchHistory=[]" class="tips">清除搜索记录</div>

        <div v-show="isLoading" class="loading"><i class="icon-loading"></i>搜索中...</div>
        <div @click="addMusic(index, item)" v-for="(item, index) of musicList" class="music">
          <div class="icon-music">
            <img :src="item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg'">
          </div>
          <div class="music-info">
            <div class="music-name">{{strDecode(item.fsong)}}</div>
            <div class="music-singer">{{item.f.split('|')[3]&&strDecode(item.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名'}}</div>
            <i v-show="index === playIndex" class="icon-listening"></i>
          </div>
        </div>
        <div v-show="musicList.length" class="tips">没有更多结果了～</div>
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
    methods: {
        showHot () {
            this.isShowHot = true
            this.$store.commit('showMiniMusic', true)
        },
        addMusic (index, item) {
            let src = 'http://ws.stream.qqmusic.qq.com/' + item.f.split('|')[0] + '.m4a?fromtag=46'
            let name = this.strDecode(item.fsong)
            let imgSrc = item.f.split('|')[4] && 'http://imgcache.qq.com/music/photo/album_300/' + item.f.split('|')[4] % 100 + '/300_albumpic_' + item.f.split('|')[4] + '_0.jpg'
            this.$store.commit('playMusic', {name: name, src: src, imgSrc: imgSrc})
            this.$store.commit('addMusic', {name: name, src: src, musicImgSrc: imgSrc})
            this.$store.commit('showMiniMusic', true)
        },
        toSearch (keywords) {
        if (keywords.trim()) {
            this.isShowHistory = false
            this.isShowHot = false
            this.playIndex = null
            this.isLoading = true
            this.$store.commit('showMiniMusic', false)
            this.keywords = keywords
            this.axios.get('/api/search/100/' + keywords)
            .then(res => res.data.data.song)
            .then(song => {
                this.musicList = song.list
                this.isLoading = false
                this.searchHistory.unshift(keywords)
            })
        }
        },
        inputFocus () {
        if (this.keywords.trim()) {
            return
        } else {
            this.isShowHot = false
            this.isShowHistory = true
            this.musicList = []
        }
        },
        strDecode (str) {
        return str.replace(/&#(x)?([^&]{1,5});?/g, function ($, $1, $2) {
            return String.fromCharCode(parseInt($2, $1 ? 16 : 10))
        })
        }
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
    .search-list {
      flex: 9;
      overflow: auto;
      .history + .history {
        border-top: 1px solid rgba(0, 0, 0, .1);
      }
      .history {
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: center;
        align-items: center;

        .icon {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .icon-history {
          display: inline-block;
          width: 23px;
          height: 23px;
          background: url('./history.svg') no-repeat;
          background-size: contain;
        }
        .icon-del {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url('./del.svg') no-repeat;
          background-size: contain;
        }
        .word {
          flex: 5;
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .tips {
        text-align: center;
        margin: 12px auto;
        width: 200px;
        font-size: 80%;
        color: gray;
      }
      .loading {
        padding-top: 10px;
        text-align: center;

        .icon-loading {
          display: inline-block;
          margin: auto;
          width: 22px;
          height: 22px;
          background: url('./loading.svg') no-repeat;
          background-size: contain;
          animation: loading .6s linear infinite;
          vertical-align: text-top;
          margin-right: 10px;
        }
      }

      .music + .music {
        border-top: 1px solid rgba(0, 0, 0, .1);
      }
      .music {
        display: flex;
        width: 100%;
        height: 60px;
        cursor: pointer;
        .icon-music {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 60px;
          height: 60px;
          img {
            display: inline-block;
            width: 90%;
            height: 90%;
            background: url(./music.svg) no-repeat;
            background-size: contain;
          }
        }
        .music-info {
          position: relative;

          flex: 1;
          padding: 8px 10px;
          .music-name {
            width: 250px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .music-singer {
            padding-top: 3px;
            font-size: 50%;
            color: gray;
          }
          i {
            position: absolute;
            display: inline-block;
            width: 13px;
            height: 13px;

          }
          i.icon-listening {
            background: url('./listening.svg') no-repeat;
            background-size: contain;
            right: 20px;
            top: 22px;
            animation: listening 1s linear infinite;
          }
          i.icon-love {
            background: url('./love.svg') no-repeat;
            background-size: contain;
            right: 40px;
            top: 20px;
          }
        }

      }
    }
}
</style>
