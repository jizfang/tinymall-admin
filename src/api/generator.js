import request from '@/utils/request'

export function list(query) {
    return request({
      url: '/generator/list',
      method: 'get',
      params: query
    })
  }
  
export function code(data) {
    return request({
      url: '/generator/code',
      method: 'post',
      data,
      responseType: 'blob',
      headers: {
        'Accept': 'application/octet-stream'
      }
    })
  }