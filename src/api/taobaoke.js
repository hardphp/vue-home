import request from '@/utils/request'

export function getCates(query) {
  return request({
    url: '/api/taoke/index',
    method: 'post',
    data: query
  })
}

export function getList(query) {
  return request({
    url: '/api/taoke/lists',
    method: 'post',
    data: query
  })
}

export function getMaterial(query) {
  return request({
    url: '/api/taoke/getMaterial',
    method: 'post',
    data: query
  })
}

export function search(query) {
  return request({
    url: '/api/taoke/search',
    method: 'post',
    data: query
  })
}

export function getdetail(query) {
  return request({
    url: '/api/taoke/getdetail',
    method: 'post',
    data: query
  })
}
