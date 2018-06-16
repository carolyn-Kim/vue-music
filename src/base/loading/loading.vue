<template>
    <div class="loading">
        <img src="./loading.gif" alt="loading" width="24" height="24">
        <p class="desc">{{ title }}</p>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '正在载入...'
        }
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';

.loading{
    width: 100%;
    text-align: center;
    & .desc{
        line-height: 22px;
        font-size: var(--font-size-small);
        color: var(--color-text-l);
    }
}
</style>
