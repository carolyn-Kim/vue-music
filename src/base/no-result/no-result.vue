<template>
    <div class="no-result">
        <div class="no-result-icon"></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';

.no-result{
    text-align: center;
    & .no-result-icon{
        width: 86px;
        height: 90px;
        margin: 0 auto;
        background-size: cover;
        background-image: image-set(
            url(./no-result@2x.png) 2x,
            url(./no-result@3x.png) 3x
        );
    }
    & .no-result-text{
        margin-top: 30px;
        font-size: var(--font-size-medium);
        color: var(--color-text-d);
    }
}
</style>
