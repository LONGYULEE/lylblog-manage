// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // 全局样式

import './icons' // icon

Vue.use(Element, {
    size: sessionStorage.getItem('size') || 'medium' // 设置默认的element-ui大小
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
