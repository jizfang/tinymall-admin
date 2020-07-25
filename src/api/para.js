import request from '@/utils/request'

export function listPara(query) {
  return request({
   url: '/para/list',
   method: 'get',
   params: query
  })
}

export function createPara(data) {
    return request({
        url: '/para/create',
        method: 'post',
        data
    })
}

export function readPara(id) {
    return request({
        url: '/para/read',
        method: 'get',
        params: {
          id
        }
    })
}

export function updatePara(data) {
    return request({
        url: '/para/update',
        method: 'put',
        data
    })
}

export function deletePara(data) {
    return request({
        url: '/para/delete',
        method: 'delete',
        data
    })
}