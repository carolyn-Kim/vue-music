<template>
    <ul class="tabs">
        <li class="tabs-item" v-for="(item, index) in tabs" :key="index" :class="{'active':currentIndex === index}" @click="tabsItem(index)">
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: () => []
        },
        currentIndex: {
            type: Number,
            default: 0
        }
    },
    methods: {
        tabsItem(index) {
            this.$emit('tabsItem', index)
        }
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';

.tabs{
    display: flex;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid var(--color-highlight-background);
    border-radius: 5px;
    & .tabs-item{
        flex: 1;
        padding: 8px;
        text-align: center;
        font-size: var(--font-size-medium);
        color: var(--color-text-d);
        &.active{
            background: var(--color-highlight-background);
            color: var(--color-text);
        }
    }
}
</style>
