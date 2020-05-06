import request from '@/utils/request'

export function getUpToken() {
    return request({
        url: '/admin/sys/article/getUpToken',
        method: 'get'
    })
}