//导出不同环境下的文件目录
module.exports = file => () => import('@/views/' + file + '.vue')