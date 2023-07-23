import request from '@/utils/request'

export function downloadExcel(url, params) {
  return request({
    url: url,
    method: 'post',
    data: params,
    responseType: 'blob' // 表明返回服务器返回的数据类型
  }).then(
    res => {
      let blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel'
      })
      let fileName = Date.parse(new Date()) + '.xlsx'
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        //释放内存
        window.URL.revokeObjectURL(link.href)
      }
    },
    err => {
      console.log(err)
    }
  )
}