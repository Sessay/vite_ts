import request from '@/utils/request'

// 产品列表
export function ProductList (params) {
  return request({
    url: '/manufacture/production/page',
    method: 'get',
    params: params
  })
}

// 产品列表 - 增删改查
export function ProductOperate (method, data) {
  return request({
    url: (method === 'patch' || method === 'delete') ? `/manufacture/production/${data.id}` : '/manufacture/production',
    method: method,
    params: method === 'get' && data,
    data: method !== 'get' && data
  })
}

// 产品界面列表 - 增删改查
export function ProductPageOperate (method, data) {
  return request({
    url: (method === 'patch' || method === 'delete') ? `/manufacture/page/${data.id}` : '/manufacture/page',
    method: method,
    params: method === 'get' && data,
    data: method !== 'get' && data
  })
}
