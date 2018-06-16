<template>
    <div class="rank" ref="rank">
        <Scroll :data="topList" class="toplist" ref="topList">
            <ul>
                <li class="item" v-for="(item, index) in topList" :key="index" @click="selectItem(item)">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.picUrl">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song, songindex) in item.songList" :key="songindex">
                            <span>{{songindex + 1}}</span>
                            <span>{{song.songname}} - {{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!this.topList.length">
                <loading></loading>
            </div>
            <router-view></router-view>
        </Scroll>
    </div>
</template>

<script>
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
    mixins: [playListMixin],
    created() {
        this._getTopList()
    },
    data() {
        return {
            topList: []
        }
    },
    methods: {
        selectItem(item) {
            this.$router.push({
                path: `/rank/${item.id}`
            })
            this.setTopList(item)
        },
        handlePlayList(playList) {
            const bottom = playList.length > 0 ? '60px' : ''
            this.$refs.rank.style.bottom = bottom
            this.$refs.topList.refresh()
        },
        _getTopList() {
            getTopList().then(res => {
                if (res.code === ERR_OK) {
                    this.topList = res.data.topList
                    // console.log(res.data.topList)
                }
            })
        },
        ...mapMutations({
            setTopList: 'SET_TOP_LIST'
        })
    },
    components: {
        Scroll,
        Loading
    }
}
</script>

<style lang="postcss" scoped>
@import '../../common/styles/variables.css';

.rank{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    & .toplist{
        height: 100%;
        overflow: hidden;
        & .item{
            display: flex;
            margin: 0 20px;
            padding-top: 20px;
            height: 100px;
            &:last-child{
                padding-bottom: 20px;
            }
            & .icon{
                flex: 0 0 100px;
                width: 100px;
                height: 100px;
            }
            & .songlist{
                flex: 1;
                flex-direction: column;
                display: flex;
                justify-content: center;
                padding: 0 20px;
                height: 100px;
                overflow: hidden;
                background: var(--color-highlight-background);
                color:var(--color-text-d);
                font-size: var(--font-size-small);
                & .song{
                    @apply --no-wrap;
                    line-height: 26px;
                }
            }
        }
        & .loading-container{
            @apply --loading-container;
        }
    }
}
</style>
