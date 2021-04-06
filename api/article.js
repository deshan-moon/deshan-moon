import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取文章列表标签
export const getTags = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}

// 获取关注用户文章列表
export const getYourfeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    // headers:{
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTU3MDM5LCJ1c2VybmFtZSI6IkRFU0hBTiIsImV4cCI6MTYyMjgyMTYwMH0.NLtB2UKHUWCsl5Y7SNiT7KvKOcCcsvgk0JhrrtUrlgU`
    // },
    params
  })
}

// 添加用户点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 删除用户点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情页
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
