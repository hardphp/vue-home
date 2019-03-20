import Cookies from 'js-cookie'
import crypto from 'crypto'
import qs from 'qs'
import myconfig from '@/config'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: myconfig.cookieExpires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 数据加密
function getEncrypt(obj, signKey) {
  const arr = []
  const keys = []
  for (const i in obj) {
    if (typeof obj[i] !== 'object' && i !== 'signature') {
      keys.push(i)
    }
  }
  keys.sort()
  for (const i in keys) {
    arr[keys[i]] = obj[keys[i]]
  }
  const arr_str = qs.stringify(arr)
  let arr_sha1 = crypto.createHash('sha1').update(arr_str).digest('hex')
  arr_sha1 = arr_sha1 + signKey
  return crypto.createHash('md5').update(arr_sha1).digest('hex')
}

// 数据签名
export function getSignature(obj) {
  let encrypt = {}
  if (obj) {
    encrypt = obj
  }
  // 签名
  const signature = getEncrypt(encrypt, myconfig.appSecret)
  encrypt.signature = signature
  return encrypt
}

