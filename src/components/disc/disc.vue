<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getSongVKey} from 'api/singer'

export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.disc.dissname
        },
        bgImage() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created() {
        this._getSongList()
    },
    methods: {
        _getSongList() {
            if (!this.disc.dissid) {
                this.$router.push('/recommend')
                return
            }
            getSongList(this.disc.dissid).then(res => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                getSongVKey(item.songmid).then(res => {
                    if (res.code === ERR_OK) {
                        let vkey = res.data.items[0].vkey
                        if (item.songid && item.albummid) {
                            ret.push(createSong(item, vkey))
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

<style lang="postcss">
.sldie-enter-active,.slide-leave-active{
    transition: all 0.3s;
}
.slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0)
}
</style>
