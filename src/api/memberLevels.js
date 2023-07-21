import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url:'/member/levelStatistics/list',
    method:'POST',
    data:params
  })
}
//获取当天详情
export function getInfo(params) {
  return request({
    url:'/member/levelStatistics/detail',
    method:'POST',
    data:params
  })
}
