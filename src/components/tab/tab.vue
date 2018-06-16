<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to='/recommend'>
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to='/singer'>
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to='/rank'>
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to='/search'>
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
    :root{
        --font-size-medium:14px;
        --color-text-l:rgba(255,255,255,0.5);
        --color-theme:#ffcd32;
    }
    .tab{
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: var(--font-size-medium);
        & .tab-item{
            flex:1;
            text-align:center;
            & .tab-link{
                padding-bottom:5px;
                color:var(--color-text-l)
            }
            &.router-link-active{
                & .tab-link{
                    color:var(--color-theme);
                    border-bottom:2px solid var(--color-theme);
                }
            }
        }
    }
</style>
