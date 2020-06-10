// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Element from 'element-ui';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import myNotify from '@/utils/util'; //引入封装的notify
import request from '@/utils/request';
import moment from 'moment'; //引入日期格式插件

import vuescroll from 'vuescroll'; //引入vuescroll
import 'vuescroll/dist/vuescroll.css'; //引入vuescroll样式

import { isAuth } from '@/utils/util';

import './styles/element-variables.scss';
import '@/styles/index.scss'; // 全局样式
import './icons'; // icon
import { getSysParam } from '@/utils/util';
import { getSysParamArr } from '@/utils/util';

Vue.use(Element);
Vue.use(mavonEditor);
Vue.use(vuescroll);

Vue.config.productionTip = false;

//定义一个全局过滤器实现日期格式化
Vue.filter('dateformat', function(input, fmtstring) {
    //当input为时间戳时，需转为Number类型
    // 使用momentjs这个日期格式化类库实现日期的格式化功能
    return moment(input).format(fmtstring);
});

// 挂载全局
Vue.prototype.$http = request; // Ajax 请求方法
Vue.prototype.$moment = moment; //将mement挂载在vue实例中
Vue.prototype.$myNotify = myNotify; //将封装的myNotify挂载到实例中
Vue.prototype.isAuth = isAuth; // 权限方法
Vue.prototype.getSysParam = getSysParam; // 获取参数
Vue.prototype.getSysParamArr = getSysParamArr; // 获取参数列表

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
