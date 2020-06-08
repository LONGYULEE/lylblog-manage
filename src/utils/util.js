import Vue from 'vue';

//获取uuid
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

//判断拥有权限
export function isAuth(key) {
    return (
        JSON.parse(sessionStorage.getItem('permission') || '[]').indexOf(
            key
        ) !== -1 || false
    );
}

/**
 * 格式化时间
 * @param {*} time
 */
export function timeformat(time) {
    return Vue.prototype.$moment(time).format('YYYY-MM-DD HH:mm');
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
    var res = [];
    var temp = {};
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i];
    }
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = [];
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1;
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1;
            temp[data[k][pid]]['children'].push(data[k]);
        } else {
            res.push(data[k]);
        }
    }
    return res;
}

/**
 * 根据Type获取参数
 * @param type
 * @param key
 * @returns {*}
 */
export function getSysParam(type, key, list) {
    let sysParamList = list || JSON.parse(localStorage.getItem('sysParamList'));
    for (let i = 0; i < sysParamList.length; i++) {
        let sysParam = sysParamList[i];
        if (sysParam.type === type && sysParam.parKey === key) {
            return sysParam.parValue;
        }
    }
}

/**
 * 根据type获取参数列表
 * @param type
 * @returns {Array}
 */
export function getSysParamArr(type) {
    let sysParamList = JSON.parse(localStorage.getItem('sysParamList'));
    let resultArr = [];
    for (let i = 0; i < sysParamList.length; i++) {
        let sysParam = sysParamList[i];
        if (sysParam.type === type) {
            resultArr.push(sysParam);
        }
    }
    return resultArr;
}

/**
 * 格式化日期
 * @param {*} time
 */
export function dateformat(time) {
    return Vue.prototype.$moment(time).format('YYYY-MM-DD');
}

const myNotity = {};
myNotity.success = (message = '') => {
    Vue.prototype.$notify.success({
        title: '成功',
        message: message
    });
};
myNotity.error = (message = '') => {
    Vue.prototype.$notify.error({
        title: '错误',
        message: message
    });
};
myNotity.warning = (message = '') => {
    Vue.prototype.$notify({
        title: '错误',
        type: 'warning',
        message: message
    });
};

//导出封装的notify控件
export default myNotity;
