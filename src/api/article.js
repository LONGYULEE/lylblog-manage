import request from '@/utils/request'

export function getUpToken() {
    return request({
        url: '/admin/sys/article/getUpToken',
        method: 'get'
    })
}

export function deleteFile(data) {
    return request({
        url: '/admin/sys/article/deleteFile',
        method: 'get',
        data: data
    })
}