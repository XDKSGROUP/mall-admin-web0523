import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/member/list',
    method: 'get',
    params: params
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

export function getRoleByMember(id) {
  return request({
    url: '/member/role/' + id,
    method: 'get'
  })
}

export function setRole(data) {
  return request({
    url: '/member/role/update',
    method: 'post',
    data: data
  })
}
