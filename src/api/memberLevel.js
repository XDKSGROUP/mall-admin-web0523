import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url:'/memberLevel/allList',
    method:'POST',
    data:params||{}
  })
}

export function fetchList(params) {
  return request({
    url:'/memberLevel/list',
    method:'get',
    params:params
  })
}
