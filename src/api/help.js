import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/help/list',
    method: 'POST',
    data: params
  })
}

export function addInfo(data) {
  return request({
    url: '/help/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(data) {
  return request({
    url: '/help/edit',
    method: 'post',
    data: data
  })
}