import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/notice/list',
    method: 'POST',
    data: params
  })
}

export function addInfo(data) {
  return request({
    url: '/notice/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(data) {
  return request({
    url: '/notice/edit',
    method: 'post',
    data: data
  })
}

export function getInfo(data) {
  return request({
    url: '/notice/detail',
    method: 'post',
    data: data
  })
}

export function delInfo(params) {
  return request({
    url: '/notice/update/deleteStatus',
    method: 'post',
    params:params
  })
}

export function setPublishStatus(params) {
  return request({
    url: '/notice/update/publishStatus',
    method: 'post',
    params:params
  })
}
