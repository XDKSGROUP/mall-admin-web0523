import request from '@/utils/request'

export function listInfo(username) {
  const params = {
    username: username
  };
  return request({
    url: '/member/teamList',
    method: 'POST',
    data: params
  });
}
export function listInfoNext(username) {
  const params = {
    username: username
  };
  return request({
    url: '/member/nextLevelList',
    method: 'POST',
    data: params
  });
}
