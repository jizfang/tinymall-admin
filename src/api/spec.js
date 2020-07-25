import request from '@/utils/request'

export function listSpec(query) {
    return request({
        url: '/spec/list',
        method: 'get',
        params: query
    })
}

export function createSpec(data) {
    return request({
        url: '/spec/create',
        method: 'post',
        data
    })
}

export function readSpec(id) {
    return request({
        url: '/spec/read',
        method: 'get',
        params: {
          id
        }
    })
}

export function updateSpec(data) {
    return request({
        url: '/spec/update',
        method: 'put',
        data
    })
}

export function deleteSpec(data) {
    return request({
        url: '/spec/delete',
        method: 'delete',
        data
    })
}