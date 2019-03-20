import axios from 'axios'
import { Notify, Dialog } from 'vant'
import store from '@/store'
import myconfig from '@/config'
import { getToken, removeToken, getSignature } from '@/utils/auth'
import qs from 'qs'

const baseURL = process.env.NODE_ENV === 'production'
  ? myconfig.baseUrl.pro
  : myconfig.baseUrl.dev

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // api 的 base_url
  timeout: 10000, // request timeout,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 在请求发出之前进行一些操作
    config.headers['x-access-appid'] = 'ty9fd2848a039abbbb'

    if (store.getters.token) {
      // token
      config.headers['x-access-token'] = getToken()
    }
    if (config.method === 'post') {
      config.data = getSignature(config.data)
      config.data = qs.stringify(config.data)
    } else if (config.method === 'get') {
      config.params = getSignature(config.params)
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 10000) {
      // token 过期了
      if (res.code === 10305 || res.code === 10307) {
        Dialog.alert({
          message: '登录过期，请重新登录'
        }).then(() => {
          removeToken()
          location.reload()
        })
      } else {
        Notify(res.msg)
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Notify('网络异常')
    return Promise.reject(error)
  }
)

export default service
