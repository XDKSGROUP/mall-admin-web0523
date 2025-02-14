import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/returnApply/list',
    method:'get',
    params:params
  })
}

export function deleteApply(params) {
  return request({
    url:'/returnApply/delete',
    method:'post',
    params:params
  })
}
export function updateApplyStatus(id,data) {
  return request({
    url:'/returnApply/update/status/'+id,
    method:'post',
    data:data
  })
}

export function getApplyDetail(id) {
  return request({
    url:'/returnApply/'+id,
    method:'get'
  })
}


export function agree(params) {
  return request({
    url:'/returnApply/agree',
    method:'post',
    data: params
  })
}

export function reject(params) {
  return request({
    url:'/returnApply/reject',
    method:'post',
    data: params
  })
}

export function receive(params) {
  return request({
    url:'/returnApply/receive',
    method:'post',
    data: params
  })
}

export function refund(params) {
  return request({
    url:'/returnApply/refund',
    method:'post',
    data: params
  })
}