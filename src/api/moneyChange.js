import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/member/moneyDetails/list',
    method: 'POST',
    data: params
  })
}
