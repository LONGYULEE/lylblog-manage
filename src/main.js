// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Element from 'element-ui'

import myNotify from '@/utils/util' //引入封装的notify
import request from '@/utils/request'

import './styles/element-variables.scss'
import '@/styles/index.scss' // 全局样式
import './icons' // icon

Vue.use(Element);

Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = request // Ajax 请求方法
Vue.prototype.$myNotify = myNotify //将封装的myNotify挂载到实例中

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
