import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    isAddRouters:false //判断是否获取到动态路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ISADDROUTERS: (state, isAddRouters) => {
      state.isAddRouters = isAddRouters
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) { // 根据roles权限生成可访问的路由表
      return new Promise(resolve => {
        // console.log('data：'+JSON.stringify(data));
        const { roles } = data
        let accessedRouters
        // console.log('roles:' + roles.indexOf('ROLE_ADMIN'))
        if (roles.indexOf('ROLE_ADMIN') >= 0) {
          // accessedRouters = asyncRouterMap
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          // console.log('accessedRouters:' + accessedRouters)
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          // console.log('accessedRouters:' + accessedRouters)
          // accessedRouters = ''
          // accessedRouters = asyncRouterMap
        }
        // console.log('accessedRouters', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        // 表明路由加载完成
        commit('SET_ISADDROUTERS', true)
        resolve()
      })
    }
  }
}

export default permission
