import axios from 'axios'
import * as store from '../utils/store'
import md5 from 'md5'

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(config => {
  const merchant = store.get('merchant')
  if (merchant) {
    config.headers.token = merchant.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export function login(data) {
  data.pwd = md5(data.pwd)
  return axios.post('login/merchant', data)
}

export function getOrderList(params) {
  return axios.get('merchant/order/list', {
    params
  })
}

export function getOrderDetail(orderNo) {
  return axios.get(`merchant/order/${orderNo}`)
}

export function confirmOrder(data) {
  return axios.post('merchant/order', data)
}