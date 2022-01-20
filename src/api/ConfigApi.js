import request from '@/utils/request'

// 设备列表 - 增删改查
export function ConfigOperate (method, data) {
  return request({
    url: (method === 'patch' || method === 'delete' || method === 'put') ? `/config/config/${data.id}` : '/config/config',
    method: method,
    params: method === 'get' && data,
    data: method !== 'get' && data
  })
}

// 新增配置字段
export function ConfigFields (method, data) {
  return request({
    url: (method === 'patch') ? `/config/module/field/${data.id}` : '/config/module/field',
    method: method,
    params: method === 'get' && data,
    data: method !== 'get' && data
  })
}

// 导出配置
export function ConfigDownload (params) {
  return request({
    url: '/config/config_export',
    method: 'get',
    params: params
  })
}

// 配置模块 - 增删改查
export function ConfigModule (method, data) {
  return request({
    url: (method === 'patch' || method === 'delete' || method === 'put') ? `/config/module/${data.id}` : '/config/module',
    method: method,
    params: method === 'get' && data,
    data: method !== 'get' && data
  })
}

// 配置字段 - 增删改查
export function ConfigStr (method, data) {
  return request({
    url: (method === 'patch' || method === 'delete' || method === 'put') ? `/config/field/${data.id}` : '/config/field',
    method: method,
    params: method === 'get' && data,
    data: method !== 'get' && data
  })
}