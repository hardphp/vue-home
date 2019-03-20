import router from './router'
import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login' || to.path === '/reg') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，或不需要验证的直接进入
      next()
    } else if (to.meta.auth === true) { // 需要验证的重定向到登录页
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})

router.afterEach(() => {

})
