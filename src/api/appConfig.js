import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/appConfig/list',
    method: 'POST',
    data: params||{}
  })
}

export function addInfo(data) {
  return request({
    url: '/appConfig/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(data) {
  return request({
    url: '/appConfig/edit',
    method: 'post',
    data: data
  })
}