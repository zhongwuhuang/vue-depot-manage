import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import jwt from 'jwt-simple'

const whiteList = ['/login', '/authredirect'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log('to:'+to)
  console.log('from:'+from)
  console.log('getToken():'+getToken())
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      // next('/')
    } else {
      // 保存roles
      const decoded = jwt.decode(getToken(),'9FE9DF13C0C959EF',true,'HS512')
      const roles = decoded.scopes // note: roles must be a array! such as: ['editor','develop']
      console.log('isAddRouters:'+store.getters.isAddRouters);
      if(!(store.getters.isAddRouters)){//这里要做一下判断，否则会出现死循环
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          console.log('路由加载完成');
          // next()
        })
        // console.log(store.getters.addRouters);
      }else{
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
