import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/mmbrole/list',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/mmbrole/create',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/mmbrole/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/mmbrole/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteRole(data) {
  return request({
    url:'/mmbrole/delete',
    method:'post',
    data:data
  })
}

export function listAll() {
  return request({
    url: '/mmbrole/listAll',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/mmbrole/listMenu/'+roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/mmbrole/listResource/'+roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/mmbrole/allocMenu',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/mmbrole/allocResource',
    method: 'post',
    data:data
  })
}
