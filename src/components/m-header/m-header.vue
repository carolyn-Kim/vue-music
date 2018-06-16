<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Music</h1>
        <router-link to="/user" class="mine" tag="div">
            <i class="icon-mine"></i>
        </router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="postcss">
@import url('../../common/styles/variables.css');

.m-header{
    position: relative;
    height: 44px;
    text-align: center;
    color: var(--color-theme);
    font-size: 0;
    & .icon{
        display: inline-block;
        vertical-align:top;
        margin-top:6px;
        width:30px;
        height:32px;
        margin-right:9px;
        background-image:image-set(
            url(./logo@2x.png) 2x,
            url(./logo@3x.png) 3x
        );
        background-size:30px 32px;
    }
    & .text{
        display:inline-block;
        vertical-align: top;
        line-height: 44px;
        font-size: var(--font-size-large)
    }
    & .mine{
        position: absolute;
        top: 0;
        right: 0;
        & .icon-mine{
            display: block;
            padding: 12px;
            font-size: 20px;
            color: var(--color-theme);
        }
    }
}
</style>
