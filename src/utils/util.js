import Vue from 'vue'

//获取uuid
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//判断拥有权限
export function isAuth(key) {
    return JSON.parse(sessionStorage.getItem('permission') || '[]').indexOf(key) !== -1 || false
}

/**
 * 格式化时间
 * @param {*} time 
 */
export function timeformat(time) {
    return Vue.prototype.$moment(time).format("YYYY-MM-DD HH:mm");
}

/**
 * 格式化日期
 * @param {*} time 
 */
export function dateformat(time) {
    return Vue.prototype.$moment(time).format("YYYY-MM-DD");
}

const myNotity = {}
myNotity.success = (message = "") => {
    Vue.prototype.$notify.success({
        title: "成功",
        message: message
    })
}
myNotity.error = (message = "") => {
    Vue.prototype.$notify.error({
        title: "错误",
        message: message
    });
}

//导出封装的notify控件
export default myNotity