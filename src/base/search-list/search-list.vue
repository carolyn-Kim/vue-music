<template>
    <div class="search-list" v-show="searches.length">
        <transition-group tag="ul" name="list">
            <li @click="selectItem(item)" class="search-item" v-for="(item, index) in searches" :key="index">
                <span class="text">{{item}}</span>
                <span class="icon" @click.stop="deleteOne(item)">
                    <i class="icon-delete"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
export default {
    props: {
        searches: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('select', item)
        },
        deleteOne(item) {
            this.$emit('delete', item)
        }
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';
.search-list{
    & .search-item{
        display: flex;
        align-items: center;
        height: 40px;
        &.list-enter-active,&.list-leave-active{
            transition: all 0.1s
        }
        &.list-enter,&.list-leave-to{
            height: 0;
        }
        & .text{
            flex: 1;
            color: var(--color-text-l);
        }
        & .icon{
            @apply --extend-click();
            & .icon-delete{
                font-size: var(--font-size-small);
                color: var(--color-text-d);
            }
        }
    }
}
</style>
