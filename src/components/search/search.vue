<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
            <scroll :refreshDelay="refreshDelay" class="shortcut" :data="shortcut" ref="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li @click="addQuery(item.k)" class="item" v-for="(item, index) in hotKey" :key="index">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="showConfirm">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>
                        <search-list @select="addQuery"  @delete="deleteSearch" :searches="searchHistory"></search-list>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest @select="saveSearch" @listScroll="blurInput" :query="query" ref="suggest"></suggest>
        </div>
        <confirm ref="confirm" text="是否清空所有搜索历史？" confirmBtnText="清空" @confirm="deleteAll" ></confirm>
    </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import {mapActions} from 'vuex'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import {playListMixin, searchMixin} from 'common/js/mixin'

export default {
    mixins: [playListMixin, searchMixin],
    data() {
        return {
            hotKey: []
        }
    },
    created() {
        this._getHotKey()
    },
    computed: {
        shortcut() {
            return this.hotKey.concat(this.searchHIstory)
        }
    },
    methods: {
        handlePlayList(playList) {
            const bottom = playList.length > 0 ? '60px' : ''
            this.$refs.shortcutWrapper.style.bottom = bottom
            this.$refs.searchResult.style.bottom = bottom
            this.$refs.shortcut.refresh()
            this.$refs.suggest.refresh()
        },
        deleteAll() {
            this.clearSearchHistory()
        },
        showConfirm() {
            this.$refs.confirm.show()
        },
        _getHotKey() {
            getHotKey().then(res => {
                if (res.code === ERR_OK) {
                    this.hotKey = res.data.hotkey.slice(0, 10)
                }
            })
        },
        ...mapActions([
            'clearSearchHistory'
        ])
    },
    watch: {
        query(newValue) {
            if (!newValue) {
                setTimeout(() => {
                    this.$refs.shortcut.refresh()
                }, 20)
            }
        }
    },
    components: {
        SearchBox,
        Suggest,
        SearchList,
        Confirm,
        Scroll,
        playListMixin
    }
}
</script>

<style lang="postcss" scoped>
@import '../../common/styles/variables.css';
.search{
    & .search-box-wrapper{
        margin: 20px;
    }
    & .shortcut-wrapper{
        position: fixed;
        top: 178px;
        bottom: 0;
        width: 100%;
        & .shortcut{
            height: 100%;
            overflow: hidden;
            & .hot-key{
                margin: 0 20px 20px 20px;
                & .title{
                    margin-bottom: 20px;
                    font-size: var(--font-size-medium);
                    color: var(--color-text-l);
                }
                & .item{
                    display: inline-block;
                    padding: 5px 10px;
                    margin: 0 20px 20px 0;
                    border-radius: 6px;
                    background: var(--color-highlight-background);
                    font-size: var(--font-size--medium);
                    color: var(--color-text-d);
                }
            }
            & .search-history{
                position: relative;
                margin: 0 20px;
                & .title{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    font-size: var(--font-size-medium);
                    color: var(--color-text-l);
                    & .text{
                        flex: 1;
                    }
                    & .clear{
                        @apply --extend-click
                        & .icon-clear{
                            font-size: var(--font-size-medium);
                            color: var(--color-text-d)
                        }
                    }
                }
            }
        }
    }
    & .search-result{
        position: fixed;
        width: 100%;
        top: 178px;
        bottom: 0;
    }
}
</style>
