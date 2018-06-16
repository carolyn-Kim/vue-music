<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input ref="query" type="text" v-model="query" class="box" :placeholder="placeholder">
        <i @click="clear" v-show="query" class="icon-dismiss"></i>
    </div>
</template>

<script>
import {debounce} from 'common/js/util'

export default {
    props: {
        placeholder: {
            type: String,
            default: '搜索歌曲、歌手'
        }
    },
    data() {
        return {
            query: '',
            hotkey: []
        }
    },
    methods: {
        clear() {
            this.query = ''
        },
        setQuery(query) {
            this.query = query
        },
        blur() {
            this.$refs.query.blur()
        }
    },
    created() {
        this.$watch('query', debounce((newQuery) => {
            this.$emit('query', newQuery)
        }, 200))
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';

.search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: var(--color-highlight-background);
    border-radius: 6px;
    & .icon-search{
        font-size: 12px;
        color: var(--color-background);
    }
    & .box{
        flex:1;
        margin: 0 5px;
        line-height: 18px;
        background: var(--color-highlight-background);
        color: var(--color-text);
        font-size: var(--font-size-medium);
        &::placeholder{
            color: var(--color-text-d);
        }
    }
    & .icon-dismiss{
        font-size: 16px;
        color: var(--color-background);
    }
}
</style>
