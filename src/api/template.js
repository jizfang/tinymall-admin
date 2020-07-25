import request from '@/utils/request'

export function listTemplate(query) {
    return request({
        url: '/template/list',
        method: 'get',
        params: query
    })
}

export function getAll() {
    return request({
        url: '/template/getAll',
        method: 'get'
    })
}

export function createTemplate(data) {
    return request({
        url: '/template/create',
        method: 'post',
        data
    })
}

export function readTemplate(data) {
    return request({
        url: '/template/read',
        method: 'get',
        data
    })
}

export function updateTemplate(data) {
    return request({
        url: '/template/update',
        method: 'put',
        data
    })
}

export function deleteTemplate(data) {
    return request({
        url: '/template/delete',
        method: 'delete',
        data
    })
}