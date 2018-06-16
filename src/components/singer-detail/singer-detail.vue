<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail, getSongVKey} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    created() {
        this._getDetail()
        console.log(this.singer)
    },
    methods: {
        _getDetail() {
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then(res => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                    console.log(this.songs)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
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
<style lang="postcss">
@import '../../common/styles/variables.css';

.slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0);
}
.slide-enter-active,.slide-leave-active{
    transition: all 0.3s
}
</style>
