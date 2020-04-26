
//获取uuid
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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

export default myNotity