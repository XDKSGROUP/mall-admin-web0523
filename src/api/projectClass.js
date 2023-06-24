import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/project/category/list',
    method: 'POST',
    data: params||{}
  })
}

export function addInfo(data) {
  return request({
    url: '/project/info/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(id, data) {
  return request({
    url: '/project/info/edit',
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

export function authSuccess(params) {
  return request({
    url: '/member/withdrawals/auditSuccess',
    method: 'post',
    data: params
  })
}

export function authReject(params) {
  return request({
    url: '/member/withdrawals/auditReject',
    method: 'post',
    data: params
  })
}

export function paySuccess(params) {
  return request({
    url: '/member/withdrawals/paymentSuccess',
    method: 'post',
    data: params
  })
}

export function authAbolish(params) {
  return request({
    url: '/member/withdrawals/abolishSuccess',
    method: 'post',
    data: params
  })
}
