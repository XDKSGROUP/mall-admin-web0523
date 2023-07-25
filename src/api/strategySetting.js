import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/strategySetting/list',
    method: 'POST',
    data: params||{}
  })
}

export function addInfo(data) {
  return request({
    url: '/strategySetting/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(data) {
  return request({
    url: '/strategySetting/edit',
    method: 'post',
    data: data
  })
}