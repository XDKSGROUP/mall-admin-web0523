import request from '@/utils/request'
//列表信息
export function listInfo(params) {
  return request({
    url:'/member/assetsStatistics/list',
    method:'POST',
    data:params
  })
}
//获取当天详情
export function getInfo(params) {
  return request({
    url:'/member/assetsStatistics/detail',
    method:'POST',
    data:params
  })
}
