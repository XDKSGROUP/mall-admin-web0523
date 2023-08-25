import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/companyAddress/list',
    method:'get'
  })
}

export function listInfo(params) {
  return request({
    url: '/companyAddress/list',
    method: 'POST',
    data: params
  })
}

export function addInfo(data) {
  return request({
    url: '/companyAddress/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(data) {
  return request({
    url: '/companyAddress/edit',
    method: 'post',
    data: data
  })
}

export function getInfo(data) {
  return request({
    url: '/companyAddress/detail',
    method: 'post',
    data: data
  })
}

export function setSendStatus(params) {
  return request({
    url: '/companyAddress/update/sendStatus',
    method: 'post',
    params:params
  })
}

export function setReceiveStatus(params) {
  return request({
    url: '/companyAddress/update/receiveStatus',
    method: 'post',
    params:params
  })
}