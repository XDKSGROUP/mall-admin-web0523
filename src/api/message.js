import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/message/list',
    method: 'POST',
    data: params
  })
}

export function addInfo(data) {
  return request({
    url: '/message/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(id, data) {
  return request({
    url: '/message/edit',
    method: 'post',
    data: data
  })
}