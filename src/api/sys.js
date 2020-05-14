import request from '@/utils/request'

export function listWx() {
  return request({
    url: '/sys/wx',
    method: 'get'
  })
}

export function updateWx(data) {
  return request({
    url: '/sys/wx',
    method: 'post',
    data
  })
}