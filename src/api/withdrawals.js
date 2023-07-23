import request from '@/utils/request';
import Config from "@/utils/config";
import { downloadExcel } from './file';

export function listInfo(params) {
  return request({
    url: '/member/withdrawals/list',
    method: 'POST',
    data: params
  })
}

export function addInfo(data) {
  return request({
    url: '/member/register',
    method: 'post',
    data: data
  })
}

export function setInfo(id, data) {
  return request({
    url: '/member/update/' + id,
    method: 'post',
    data: data
  })
}

export function setStatus(id, params) {
  return request({
    url: '/member/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function delInfo(id) {
  return request({
    url: '/member/delete/' + id,
    method: 'post'
  })
}

export function authSuccess(params) {
  return request({
    url: '/member/withdrawals/auditSuccess',
    method: 'post',
    data: params
  })
}

export function authReject(params) {
  return request({
    url: '/member/withdrawals/auditReject',
    method: 'post',
    data: params
  })
}

export function paySuccess(params) {
  return request({
    url: '/member/withdrawals/paymentSuccess',
    method: 'post',
    data: params
  })
}

export function authAbolish(params) {
  return request({
    url: '/member/withdrawals/abolishSuccess',
    method: 'post',
    data: params
  })
}

export function exportExcel(params) {
  return downloadExcel(Config.baseApiUrl + "/member/withdrawals/export", params);
}