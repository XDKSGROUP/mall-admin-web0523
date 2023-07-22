import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url:'/order/salesList',
    method:'POST',
    data:params
  })
}