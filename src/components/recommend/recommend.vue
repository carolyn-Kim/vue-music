<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="distList">
            <div>
                <div class="slider-wrapper"  v-if="recommends.length">
                    <slider>
                        <div v-for="item in recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li @click="selectItem(item)" v-for="(item, index) in distList" :key="index" class="item">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!distList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
import { ERR_OK } from 'api/config'

export default {
    mixins: [playListMixin],
    data() {
        return {
            recommends: [],
            distList: []
        }
    },
    created() {
        this._getRecommend()
        this._getDiscList()
    },
    methods: {
        selectItem(item) {
            this.$router.push({
                path: `/recommend/${item.dissid}`
            })
            this.setDisc(item)
        },
        handlePlayList(playList) {
            const bottom = playList.length > 0 ? '60px' : ''
            this.$refs.recommend.style.bottom = bottom
            this.$refs.scroll.refresh()
        },
        _getRecommend() {
            getRecommend().then(res => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                }
            })
        },
        _getDiscList() {
            getDiscList().then(res => {
                if (res.code === ERR_OK) {
                    this.distList = res.data.list
                }
            })
        },
        loadImage() {
            if (!this.checkLoaded) {
                this.$refs.scroll.refresh()
                this.checkLoaded = true
            }
        },
        ...mapMutations({
            setDisc: 'SET_DISC'
        })
    },
    components: {
        Slider, Scroll, Loading
    }
}
</script>

<style lang="postcss" scoped>
@import '../../common/styles/variables.css';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  & .recommend-content {
    height: 100%;
    overflow: hidden;
    & .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    & .recommend-list {
      & .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: var(--font-size-medium);
        color: var(--color-theme);
      }
      & .item{
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;
          & .icon{
              flex:0 0 60px;
              width:60px;
              padding-right:20px;
          }
          & .text{
              display: flex;
              flex:1;
              flex-direction: column;
              justify-content: center;
              line-height: 30px;
              overflow: hidden;
              font-size: var(--font-size-medium);
              & .name{
                  margin-bottom: 10px;
                  color:var(--color-text)
              }
              & .desc{
                  color:var(--color-text-d)
              }
          }
      }
    }
    & .loading-container{
        @apply --loading-container
    }
  }
}
</style>
