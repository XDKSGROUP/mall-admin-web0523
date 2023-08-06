import request from '@/utils/request'
import Config from "@/utils/config";
import { downloadExcel } from './file';

export function listInfo(params) {
  return request({
    url: '/bankCard/list',
    method: 'POST',
    data: params||{}
  })
}

export function addInfo(data) {
  return request({
    url: '/bankCard/edit',
    method: 'post',
    data: data
  })
}

export function setInfo(data) {
  return request({
    url: '/bankCard/edit',
    method: 'post',
    data: data
  })
}

export function exportExcel(params) {
  return downloadExcel(Config.baseApiUrl + "/bankCard/export", params);
}