import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/helpCategory/list',
    method: 'POST',
    data: params
  })
}

export function addInfo(data) {
  return request({
    url: '/helpCategory/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(data) {
  return request({
    url: '/helpCategory/edit',
    method: 'post',
    data: data
  })
}