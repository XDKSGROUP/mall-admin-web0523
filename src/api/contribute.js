import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/member/projectOrder/list',
    method: 'POST',
    data: params
  })
}

export function addInfo(data) {
  return request({
    url: '/member/register',
    method: 'post',
    data: data
  })
}

export function setInfo(id, data) {
  return request({
    url: '/member/update/' + id,
    method: 'post',
    data: data
  })
}

export function setStatus(id, params) {
  return request({
    url: '/member/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function delInfo(id) {
  return request({
    url: '/member/delete/' + id,
    method: 'post'
  })
}


export function paySuccess(params) {
  return request({
    url: '/member/recharge/confirmSuccess',
    method: 'post',
    data: params
  })
}

export function authAbolish(params) {
  return request({
    url: '/member/recharge/abolishSuccess',
    method: 'post',
    data: params
  })
}
