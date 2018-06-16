import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/styles/index.css'
import fastclick from 'fastclick'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
// Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
    loading: require('common/images/default.png') // 替代预览的图片
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
