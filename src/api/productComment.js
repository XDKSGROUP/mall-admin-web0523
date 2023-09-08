import request from '@/utils/request'
export function listInfo(params) {
  return request({
    url:'/comment/list',
    method:'post',
    data:params
  })
}

export function replay(params) {
  return request({
    url:'/comment/replay',
    method:'post',
    data:params
  })
}
