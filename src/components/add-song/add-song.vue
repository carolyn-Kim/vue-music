<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close" @click="hide">
                    <i class="icon-close"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box ref="searchBox" placeholder="搜索歌曲" @query="onQuerySearch"></search-box>
            </div>
            <div class="shortcut" v-show="!query">
                <tabs :tabs="tabs" :currentIndex="currentIndex" @tabsItem="tabsItem"></tabs>
                <div class="list-wrapper">
                    <scroll ref="songlist" class="list-scroll" v-if="currentIndex === 0" :data="playHistory">
                        <div class="list-inner">
                            <song-list :songs="playHistory" @select="selectSong"></song-list>
                        </div>
                    </scroll>
                    <scroll ref="searchlist" class="list-scroll" v-if="currentIndex === 1" :data="searchHistory">
                        <div class="list-inner">
                            <search-list :refreshDelay="refreshDelay" @delete="deleteSearch" @select="addQuery" :searches="searchHistory"></search-list>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggets :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggets>
            </div>
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放队列</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggets from 'components/suggest/suggest'
import {searchMixin} from 'common/js/mixin'
import Tabs from 'base/tabs/tabs'
import Scroll from 'base/scroll/scroll'
import {mapGetters, mapActions} from 'vuex'
import SongList from 'base/song-list/song-list'
import Song from 'common/js/song'
import SearchList from 'base/search-list/search-list'
import TopTip from 'base/top-tip/top-tip'

export default {
    mixins: [searchMixin],
    data() {
        return {
            showFlag: false,
            showSinger: false,
            currentIndex: 0,
            tabs: [
                {name: '最近播放'},
                {name: '搜索历史'}
            ]
        }
    },
    computed: {
        ...mapGetters([
            'playHistory'
        ])
    },
    methods: {
        selectSong(song, index) {
            if (index !== 0) {
                this.insertSong(new Song(song))
                this._showTip()
            }
        },
        tabsItem(index) {
            this.currentIndex = index
        },
        onQuerySearch(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        show() {
            this.showFlag = true
            setTimeout(() => {
                if (this.currentIndex === 0) {
                    this.$refs.songlist.refresh()
                } else {
                    this.$refs.searchlist.refresh()
                }
            }, 20)
        },
        hide() {
            this.showFlag = false
        },
        selectSuggest() {
            this.saveSearch()
            this._showTip()
        },
        _showTip() {
            this.$refs.topTip.show()
        },
        ...mapActions([
            'insertSong'
        ])
    },
    components: {
        SearchBox,
        Suggets,
        Tabs,
        Scroll,
        SongList,
        SearchList,
        TopTip
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';
.slide-enter-active,.slide-leave-active{
    transition: all 0.3;
}
.slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
.add-song{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: var(--color-background);
    & .header{
        position: relative;
        height: 44px;
        text-align: center;
        & .title{
            line-height: 44px;
            font-size: var(--font-size-large);
            color: var(--color-text);
        }
        & .close{
            position: absolute;
            top: 0;
            right: 8px;
            & .icon-close{
                display: block;
                padding: 12px;
                font-size: 20px;
                color: var(--color-theme);
            }
        }
    }
    & .search-box-wrapper{
        margin: 20px;
    }
    & .shortcut{
        & .list-wrapper{
            position: absolute;
            top: 165px;
            bottom: 0;
            width: 100%;
            & .list-scroll{
                height: 100%;
                overflow: hidden;
                & .list-inner{
                    padding: 20px 30px;
                }
            }
        }
    }
    & .search-result{
        position: fixed;
        top: 124px;
        bottom: 0;
        width: 100%;
    }
    & .tip-title{
        text-align: center;
        padding: 18px 0;
        font-size: 0;
        & .icon-ok{
            font-size: var(--font-size-medium);
            color: var(--color-theme);
            margin-right: 4px;
        }
        & .text{
            font-size: var(--font-size-medium);
            color: var(--color-text);
        }
    }
}
</style>
