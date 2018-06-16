<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active:currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()

            if (this.autoPlay) {
                this._play()
            }
        }, 20)

        window.addEventListener('resize', () => {
            if (!this.slider || !this.slider.enabled) {
                return
            }
            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    methods: {
        _setSliderWidth(isResize) {
            this.children = this.$refs.sliderGroup.children

            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }

            if (this.loop && !isResize) {
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: this.loop, // 循环
                    threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
                    speed: 400 // 轮播间隔
                }
            })
            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                    this._play()
                }
            })
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _play() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.slider.next()
            }, this.interval)
        }
    },
    destroyed() {
        clearTimeout(this.timer)
    }
}
</script>

<style lang="postcss">
@import '../../common/styles/variables.css';
.slider {
  min-height: 1px;
  & .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    & .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      & img {
        display: block;
        width: 100%;
      }
      & a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
    }
  }
  & .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    & .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background: var(--color-text-ll);
        &.active{
            width: 20px;
            border-radius: 5px;
            background: var(--color-text-ll);
        }
    }
  }
}
</style>
