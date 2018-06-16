<template>
    <scroll class="suggest" :data="result" :pullup="pullup"
        @scrollToEnd="searchMore"
        ref="suggest"
        :beforeScroll = "beforeScroll"
        @beforeScroll = "listScroll"
        >
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {getSongVKey} from 'api/singer'
import {createSong} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import { mapMutations, mapActions } from 'vuex'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const PER_PAGE = 20

export default {
    data() {
        return {
            page: 1,
            result: [],
            pullup: true,
            hasMore: true,
            firstMore: true,
            beforeScroll: true
        }
    },
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        selectItem(item) {
            if (item.type === TYPE_SINGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path: `/singer/${singer.id}`
                })
                this.setSinger(singer)
            } else {
                this.insertSong(item)
            }
            this.$emit('select')
        },
        getDisplayName(item) {
            if (item.type === TYPE_SINGER) {
                return item.singername
            } else {
                return `${item.name} - ${item.singer}`
            }
        },
        getIconCls(item) {
            if (item.type === TYPE_SINGER) {
                return 'icon-mine'
            } else {
                return 'icon-music'
            }
        },
        search() {
            this.page = 1
            this.hasMore = true
            this.$refs.suggest.scrollTo(0, 0)
            search(this.query, this.page, this.showSinger, PER_PAGE).then(res => {
                if (res.code === ERR_OK) {
                    this._genResult(res.data).then(res => {
                        this.result = res
                    })
                    // console.log(this.result)
                    this._checkMore(res.data)
                }
            })
        },
        searchMore() {
            if (!this.hasMore) {
                return
            }
            this.page++
            this.firstMore = false
            search(this.query, this.page, this.showSinger, PER_PAGE).then(res => {
                if (res.code === ERR_OK) {
                    this._genResult(res.data).then(res => {
                        this.result = this.result.concat(res)
                    })
                    this._checkMore(res.data)
                }
            })
        },
        listScroll() {
            this.$emit('listScroll')
        },
        refresh() {
            this.$refs.suggest.refresh()
        },
        _checkMore(data) {
            const song = data.song
            if (!song.list.length || (song.curnum + song.curpage * PER_PAGE) > song.totalnum) {
                this.hasMore = false
            }
        },
        _genResult(data) {
            return new Promise((resolve) => {
                this._normalizeSongs(data.song.list).then(res => {
                    let ret = []
                    if (data.zhida && data.zhida.singerid && this.firstMore) {
                        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                    }
                    if (data.song) {
                        ret = ret.concat(res)
                    }
                    resolve(ret)
                })
            })
        },
        _normalizeSongs(list) {
            return Promise.all(list.map(item => this._getPromise(item))).then(results => results)
        },
        _getPromise(list) {
            return new Promise((resolve) => {
                getSongVKey(list.songmid).then(res => {
                    if (res.code === ERR_OK) {
                        let vkey = res.data.items[0].vkey
                        if (list.songid && list.albummid) {
                            resolve(createSong(list, vkey))
                        }
                    }
                })
            })
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    watch: {
        query() {
            this.search()
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    }
}
</script>

<style lang="postcss" scoped>
@import '../../common/styles/variables.css';
.suggest{
    height: 100%;
    overflow: hidden;
    & .suggest-list{
        padding: 0 30px;
        & .suggest-item{
            display: flex;
            align-items: center;
            padding-bottom: 20px;
        }
        & .icon{
            flex: 0 0 30px;
            width: 30px;
            & [class ^= "icon-"]{
                font-size: 14px;
                color: var(--color-text-d);
            }
        }
        & .name{
            flex: 1;
            font-size: var(--font-size-medium);
            color: var(--color-text-d);
            overflow: hidden;
            & .text {
                @apply --no-wrap;
            }
        }
    }
    & .no-result-wrapper{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
