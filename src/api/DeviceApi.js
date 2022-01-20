import request from '@/utils/request'

// 设备列表 - 增删改查
export function DeviceOperate (method, data) {
  return request({
    url: (method === 'patch' || method === 'delete' || method === 'put') ? `/device/device/${data.id}` : '/device/device',
    method: method,
    params: method === 'get' && data,
    data: method !== 'get' && data
  })
}

// 设备类型
export function DeviceType (params) {
  return request({
    url: '/device/type',
    method: 'get',
    params: params
  })
}
