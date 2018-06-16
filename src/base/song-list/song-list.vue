<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song, index)" v-for="(song, index) in songs" :key="index" class="item">
                <div class="rank" v-show="rank">
                    <span :class="getRankCls(index)">{{getRankText(index)}}</span>
                </div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            default: null
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getRankCls(index) {
            if (index <= 2) {
                return `icon icon${index}`
            } else {
                return `text`
            }
        },
        getRankText(index) {
            if (index > 2) {
                return index + 1
            }
        },
        getDesc(song) {
            return `${song.singer} . ${song.album}`
        },
        selectItem(item, index) {
            this.$emit('select', item, index)
        }
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';
.song-list{
    & .item{
        display: flex;
        align-items: center;
        height: 64px;
        font-size:var(--font-size-medium);
        box-sizing:border-box;
        & .rank{
            flex: 0 0 25px;
            width: 25px;
            margin-right: 30px;
            text-align: center;
            & .icon{
               display: inline-block;
               width: 25px;
               height: 25px;
               background-size: 25px 25px;
               &.icon0{
                   background-image: image-set(
                       url(./first@2x.png) 2x,
                       url(./first@3x.png) 3x
                   );
               }
               &.icon1{
                   background-image: image-set(
                       url(./second@2x.png) 2x,
                       url(./second@3x.png) 3x
                   );
               }
               &.icon2{
                   background-image: image-set(
                       url(./third@2x.png) 2x,
                       url(./third@3x.png) 3x
                   );
               }
            }
            & .text{
                   color: var(--color-theme);
                   font-size: var(--font-size-large);
            }
        }
        & .content{
            flex:1;
            line-height: 20px;
            overflow: hidden;
            & .name{
                color: var(--color-text);
            }
            & .desc{
                margin-top: 4px;
                color: var(--color-text-d);
            }
        }
    }
}
</style>
