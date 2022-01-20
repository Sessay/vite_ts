import axios from 'axios'
import baseURL from './baseURL'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL
})

request.interceptors.request.use(config => {
  const data = config.method === 'get' ? config.params : config.data
  for (const obj in data) {
    data[obj] === '' && delete data[obj]
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  if (/^20./g.test(`${response.status}`)) {
    return response.data
  } else {
    ElMessage.error(response.data.msg)
    return Promise.reject(response.data.msg)
  }
}, error => {
  return Promise.reject(error)
})

export default request
