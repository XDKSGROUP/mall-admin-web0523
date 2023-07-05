/*
 * @Author: ft-zhangj ft-zhangj@geek.glodon.com
 * @Date: 2023-06-24 18:34:03
 * @LastEditors: ft-zhangj ft-zhangj@geek.glodon.com
 * @LastEditTime: 2023-07-06 02:25:53
 * @FilePath: \mall-admin-web0523\src\api\member.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function listInfo(params) {
  return request({
    url: '/member/list',
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
    method: 'post',
  })
}

export function resetLoginPassword(params) {
  return request({
    url: '/member/resetPassword',
    method: 'post',
    data: params
  })
}

export function resetPaymentPassword(params) {
  return request({
    url: '/member/resetPaymentPassword',
    method: 'post',
    data: params
  })
}

export function getRoleByMember(id) {
  return request({
    url: '/member/role/' + id,
    method: 'get'
  })
}

export function setRole(data) {
  return request({
    url: '/member/role/update',
    method: 'post',
    data: data
  })
}

export function updateProperty(params) {
  return request({
    url: '/member/updateProperty',
    method: 'post',
    data: params
  })
}