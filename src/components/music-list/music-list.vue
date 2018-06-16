<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="playwrapper">
                <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
            <div class="song-list-wrapper">
                <song-list :rank="rank" @select="selectItem" :songs="songs"></song-list>
            </div>
            <div class="loading-container" v-show="!songs.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import {prefixStyle} from 'common/js/dom'
import loading from 'base/loading/loading'
import {mapActions} from 'vuex'
import {playListMixin} from 'common/js/mixin'

const transform = prefixStyle('transform')
const backdropFilter = prefixStyle('backdrop-filter')
const RESERVED_HEIGHT = 40

export default {
    mixins: [playListMixin],
    props: {
        bgImage: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: null
        },
        title: {
            type: String,
            default: ''
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scrollY: 0
        }
    },
    created() {
        this.probeType = 3
        this.listenScroll = true
    },
    computed: {
        bgStyle() {
            return `background-image:url(${this.bgImage})`
        }
    },
    mounted() {
        this.imageHeigth = this.$refs.bgImage.clientHeight
        this.minTranslatY = -this.imageHeigth + RESERVED_HEIGHT
        this.$refs.list.$el.style.top = `${this.imageHeigth}px`
    },
    methods: {
        handlePlayList(playList) {
            const bottom = playList.length > 0 ? '60px' : ''
            this.$refs.list.$el.style.bottom = bottom
            this.$refs.list.refresh()
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        back() {
            this.$router.back()
        },
        selectItem(item, index) {
            this.selectPlay({
                list: this.songs,
                index: index
            })
        },
        random() {
            this.randomPlay({
                list: this.songs
            })
        },
        ...mapActions([
            'selectPlay',
            'randomPlay'
        ])
    },
    watch: {
        scrollY(newY) {
            let translateY = Math.max(this.minTranslatY, newY)
            let zIndex = 0
            let scale = 1
            let blur = 0
            this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
            const percent = Math.abs(newY / this.imageHeigth)
            if (newY > 0) {
                scale = 1 + percent
                zIndex = 10
            } else {
                blur = Math.min(20 * percent, 20)
            }
            this.$refs.filter.style[backdropFilter] = `blur(${blur}px)`
            if (newY < this.minTranslatY) {
                zIndex = 10
                this.$refs.bgImage.style.paddingTop = 0
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
                this.$refs.playBtn.style.display = 'none'
            } else {
                this.$refs.bgImage.style.paddingTop = '70%'
                this.$refs.bgImage.style.height = 0
                this.$refs.playBtn.style.display = ''
            }
            this.$refs.bgImage.style.zIndex = zIndex
            this.$refs.bgImage.style[transform] = `scale(${scale})`
        }
    },
    components: {
        Scroll,
        SongList,
        loading
    }
}
</script>
<style lang="postcss">
@import '../../common/styles/variables.css';
.music-list{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: var(--color-background);
    & .back{
        position: absolute;
        top: 0;
        left:6px;
        z-index:50;
        & .icon-back{
            display: block;
            padding:10px;
            font-size: var(--font-size-large-x);
            color:var(--color-theme);
        }
    }
    & .title{
        position: absolute;
        top: 0;
        left: 10%;
        width: 80%;
        text-align: center;
        line-height: 40px;
        font-size: var(--font-size-large);
        color:var(--color-text);
        z-index: 40;
    }
    & .bg-image{
        position: relative;
        width: 100%;
        height: 0;
        padding-top:70%;
        background-size: cover;
        transform-origin: top;
        & .playwrapper{
            position: absolute;
            bottom: 20px;
            z-index: 50;
            width: 100%;
            & .play{
                width: 135px;
                box-sizing: border-box;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid var(--color-theme);
                color: var(--color-theme);
                border-radius: 100px;
                font-size: 0;
                & .icon-play{
                    display: inline-block;
                    font-size: var(--font-size-medium-x);
                    vertical-align: middle;
                    margin-right: 6px;
                }
                & .text{
                    font-size: var(--font-size-small);
                    vertical-align: middle;
                    display: inline-block;
                }
            }
        }
    }
    & .list{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: var(--color-background);
        & .song-list-wrapper{
            padding: 20px 30px;
        }
        & .song-list-container{
            position: absolute;
        }
        & .loading-container{
            @apply --loading-container
        }
    }
    & .bg-layer{
        position: relative;
        height: 100%;
        background: var(--color-background)
    }
}
</style>
