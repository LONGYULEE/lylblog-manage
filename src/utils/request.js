import axios from 'axios'
import qs from 'qs' // 字符串处理
import merge from 'lodash/merge' // 合并对象工具
import { getToken } from '@/utils/auth'
import Router from 'vue-router'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        config.headers['Authorization'] = 'Bearer ' + getToken();
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        //http状态码判断
        if (response.data && response.data.message === 'token失效') {
            //删除cookie中的token信息
            //this.$cookies.remove('token');
            //删除sessionStorage中的信息
            window.sessionStorage.clear();
            Router.push('/login')
            location.reload();
            Vue.prototype.$message({
                message: '登录信息失效，请重新登录',
                type: "warning"
            })
        }
        return response;
    },
    error => {
        console.log('err' + error) // for debug
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
)

/**
 * get 请求参数处理
 * @param params 参数
 * @param openDefaultParams 是否开起默认参数，为true，会取到参数名，为false参数不作处理
 * @returns {*}
 */
service.adornParams = (params = {}, openDefaultParams = true) => {
    var defaluts = {
        't': new Date().getTime()
    }
    return openDefaultParams ? merge(defaluts, params) : params
}

/**
 * post请求参数处理
 * @param data
 * @param openDefaultdata
 * @param contentType
 * @returns {string}
 */
service.adornData = (data = {}, openDefaultdata = true, contentType = 'json') => {
    var defaults = {
        't': new Date().getTime()
    }
    data = openDefaultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default service
