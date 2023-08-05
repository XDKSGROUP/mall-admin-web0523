import request from '@/utils/request'
import Config from "@/utils/config";
export function policy() {
  return request({
    url: '/aliyun/oss/policy?https=' + Config.apiHttps,
    method: 'get',
  })
}
