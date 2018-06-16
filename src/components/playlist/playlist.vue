<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class="iconMode" @click="changeMode"></i>
                        <span class="text">{{modeText}}</span>
                        <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
                    </h1>
                </div>
                <scroll class="list-content" :refreshDelay="refreshDelay" :data="sequenceList" ref="listContent">
                    <transition-group name="list" tag="ul">
                        <li ref="listItem" class="item" @click="selectItem(item, index)" v-for="(item, index) in sequenceList" :key="index">
                            <i class="current" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="like" @click.stop="toggleFavorite(item)">
                                <i class="icon" :class="getFavoriteIcon(item)"></i>
                            </span>
                            <span class="delete" @click.stop="deleteOne(item)">
                                <i class="icon-delete"></i>
                            </span>
                        </li>
                    </transition-group>

                </scroll>
                <div class="list-operate">
                    <div class="add" @click="addSong">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲到列表</span>
                    </div>
                </div>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="confirmClear"></confirm>
            <add-song ref="addSong"></add-song>
        </div>
    </transition>
</template>

<script>
import {mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {playMode} from 'common/js/config'
import Confirm from 'base/confirm/confirm'
import {playerMixin} from 'common/js/mixin'
import AddSong from 'components/add-song/add-song'

export default {
    mixins: [playerMixin],
    data() {
        return {
            showFlag: false,
            refreshDelay: 100
        }
    },
    computed: {
        modeText() {
            return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
        }
    },
    methods: {
        addSong() {
            this.$refs.addSong.show()
        },
        show() {
            this.showFlag = true
            setTimeout(() => {
                this.$refs.listContent.refresh()
                this.scrollToCurrent(this.currentSong)
            }, 20)
        },
        hide() {
            this.showFlag = false
        },
        getCurrentIcon(item) {
            if (this.currentSong.id === item.id) {
                return 'icon-play'
            } else {
                return ''
            }
        },
        selectItem(item, index) {
            if (this.mode === playMode.random) {
                index = this.playList.findIndex((song) => {
                    return song.id === item.id
                })
            }
            this.setCurrentIndex(index)
            this.setPlayingState(true)
        },
        scrollToCurrent(current) {
            const index = this.sequenceList.findIndex((song) => {
                return current.id === song.id
            })
            this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
        },
        deleteOne(item) {
            this.deleteSong(item)
            if (!this.playList.length) {
                this.hide()
            }
        },
        showConfirm() {
            this.$refs.confirm.show()
        },
        confirmClear() {
            this.deleteSongList()
            this.hide()
        },
        ...mapActions([
            'deleteSong',
            'deleteSongList'
        ])
    },
    watch: {
        currentSong(newValue, oldValue) {
            if (!this.showFlag || newValue.id === oldValue.id) {
                return
            }
            this.scrollToCurrent(newValue)
        }
    },
    components: {
        Scroll,
        Confirm,
        AddSong
    }
}
</script>

<style lang="postcss" scoped>
@import '../../common/styles/variables.css';

.playlist{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background: var(--color-background-d);
    & .list-wrapper{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: var(--color-highlight-background);
        & .list-header{
            position: relative;
            padding: 20px 30px 10px 20px;
            & .title{
                display: flex;
                align-items: center;
                & .icon{
                    margin-right: 10px;
                    font-size: 30px;
                    color: var(--color-theme-d)
                }
                & .text{
                    flex: 1;
                    font-size: var(--font-size-medium);
                    color: var(--color-text-l);
                }
                & .clear{
                    @apply --extend-click;
                    & .icon-clear{
                        font-size: var(--font-size-medium);
                        color: var(--color-text-d);
                    }
                }
            }
        }
        & .list-content{
            position: relative;
            max-height: 240px;
            overflow: hidden;
            & .item{
                display: flex;
                align-items: center;
                height: 40px;
                padding: 0 30px 0 20px;
                overflow: hidden;
                &.list-enter-active,&.list-leave-active{
                    transition: all 0.1s linear;
                }
                &.list-enter,&.list-leave-to{
                    height: 0;
                }
                & .current{
                    flex: 0 0 20px;
                    width: 20px;
                    font-size: var(--font-size-small);
                    color: var(--color-theme-d);
                }
                & .text{
                    flex: 1;
                    @apply --no-wrap;
                    font-size: var(--font-size-medium);
                    color:var(--color-text-d);
                }
                & .like{
                    @apply --extend-click;
                    margin-right: 15px;
                    font-size: var(--font-size-small);
                    color: var(--color-theme);
                    & .icon-favorite{
                        color: var(--color-sub-theme);
                    }
                }
                & .delete{
                    @apply --extend-click;
                    font-size: var(--font-size-small);
                    color: var(--color-theme)
                }
            }
        }
        & .list-operate{
            width: 140px;
            margin: 20px auto 30px auto;
            & .add{
                display: flex;
                align-items: center;
                padding: 8px 16px;
                border: 1px solid var(--color-text-l);
                border-radius: 100px;
                color: var(--color-text-l);
                & .icon-add{
                    margin-right: 5px;
                    font-size: var(--font-size-small-s);
                }
                & .text{
                    font-size: var(--font-size-small);
                }
            }
        }
        & .list-close{
            text-align: center;
            line-height: 50px;
            background: var(--color-background);
            font-size: var(--font-size-medium-x);
            color: var(--color-text-l);
        }
    }
}

.list-fade-enter-active,.list-fade-leave-active{
    transition: opacity 0.3s;
    & .list-wrapper{
        transition: all 0.3s;
    }
}
.list-fade-enter,.list-fade-leave-to{
    opacity: 0;
    & .list-wrapper{
        transform: translate3d(0,100%,0)
    }
}
</style>
