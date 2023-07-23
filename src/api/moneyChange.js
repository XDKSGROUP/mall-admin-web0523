import request from '@/utils/request';
import Config from "@/utils/config";
import { downloadExcel } from './file';

export function listInfo(params) {
  return request({
    url: '/member/moneyDetails/list',
    method: 'POST',
    data: params
  })
}

export function exportExcel(params) {
  return downloadExcel(Config.baseApiUrl + "/member/moneyDetails/export", params);
}
