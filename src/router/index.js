import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 路由模块*/
export const constantRouterMap = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: {
      auth: false,
      title: '登录'
    }
  },
  {
    path: '/reg',
    component: () => import('@/views/reg/index'),
    meta: {
      auth: false,
      title: '注册'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index'),
    meta: {
      auth: false,
      title: '首页'
    }
  },
  {
    path: '/search/:keyword',
    name: 'search',
    component: () => import('@/views/search/index'),
    meta: {
      auth: false,
      title: '搜索'
    }
  },
  {
    path: '/lists/:id/:mark',
    name: 'lists',
    component: () => import('@/views/lists/index'),
    meta: {
      auth: false,
      title: '列表'
    }
  },
  {
    path: '/goods/:numiid/:volume/:couponAmount/:price/:commission/:url',
    name: 'goods',
    component: () => import('@/views/goods/index'),
    meta: {
      auth: false,
      title: '商品'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index'),
    meta: {
      auth: false,
      title: '代理'
    }
  },
  {
    path: '/user/info',
    name: 'userinfo',
    component: () => import('@/views/user/info'),
    meta: {
      auth: false,
      title: '个人资料'
    }
  },
  {
    path: '/user/level',
    name: 'userlevel',
    component: () => import('@/views/user/level'),
    meta: {
      auth: false,
      title: '代理级别'
    }
  }
]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
