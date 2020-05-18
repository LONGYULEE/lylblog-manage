import request from '@/utils/request'

export function getUpToken() {
    return request({
        url: '/admin/article/getUpToken',
        method: 'get'
    })
}