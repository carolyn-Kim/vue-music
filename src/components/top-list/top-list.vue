<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getSongVKey} from 'api/singer'
export default {
    data() {
        return {
            songs: [],
            rank: true
        }
    },
    computed: {
        title() {
            return this.topList.topTitle
        },
        bgImage() {
            if (this.songs.length) {
                return this.songs[0].image
            }
            return ''
        },
        ...mapGetters([
            'topList'
        ])
    },
    created() {
        this._getMusicList()
    },
    methods: {
        _getMusicList() {
            if (!this.topList.id) {
                this.$router.push('/rank')
                return
            }
            getMusicList(this.topList.id).then(res => {
                if (res.code === ERR_OK) {
                    // console.log(res.songlist)
                    this.songs = this._normalizeSongs(res.songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach(item => {
                const musicData = item.data
                getSongVKey(musicData.songmid).then(res => {
                    if (res.code === ERR_OK) {
                        let vkey = res.data.items[0].vkey
                        if (musicData.songid && musicData.albummid) {
                            ret.push(createSong(musicData, vkey))
                        }
                    }
                })
            })
            return ret
        }
    },
    components: {
        MusicList
    }
}
</script>

<style lang="postcss" scoped>
.slide-enter, .slider-leave-to {
    transform: translate3d(100%, 0, 0)
}
.slide-enter-active, .slider-leave-active{
    transition: all 0.3s;
}
</style>
