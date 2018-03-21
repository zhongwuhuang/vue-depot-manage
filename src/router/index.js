import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [

  {
    path: '*', //所有的（*代表所有）错误页面
    component: () => import('../views/error/404.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/index',
    hidden: true
  },
  {
    path: '/login',
    name: '登录页面',
    hidden: true,
    component: resolve => require(['../views/login/Login.vue'], resolve)
  },
  {
    path: '/applytest',
    name: '采购页面',
    hidden: true,
    component: resolve => require(['../views/page/applytest.vue'], resolve)
  },
  {
    path: '/index',
    meta: {title: '首页',icon: 'el-icon-menu'},
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [{
      name: 'index',
      path: '/index',
      component: resolve => require(['../views/page/index.vue'], resolve)
    }]
  },
  {
    path: '/query',
    meta: {title: '物资查询',icon: 'el-icon-search'},
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [{
      name: 'query',
      path: '/query',
      component: resolve => require(['../views/page/query.vue'], resolve)
    }]
  },
  {
    path: '/pur',
    meta: {title: '物资采购',icon: 'el-icon-setting'},
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [{
      name: 'pur',
      path: '/pur',
      component: resolve => require(['../views/page/pur.vue'], resolve)
    }]
  },

]

export default new Router({
  // mode:'history',//简化路由,更好看,不带#
  routes: constantRouterMap
})
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  // 仓管
  {
    path: '/apply',
    meta: {title: '物资申领',icon: 'el-icon-goods',roles: ['ROLE_ADMIN']},
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [{
      name: 'apply',
      path: '/apply',
      component: resolve => require(['../views/page/admin/apply.vue'], resolve)
    }]
  },
  {
    path: '/sto',
    meta: {title: '物资入库',icon: 'el-icon-sold-out',roles: ['ROLE_ADMIN']},
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [{
      name: 'sto',
      path: '/sto',
      component: resolve => require(['../views/page/admin/sto.vue'], resolve)
    }]
  },

  // 普通用户
  // {
  //   path: '/user',
  //   meta: {title: '首页',icon: 'el-icon-setting',roles: ['ROLE_USER']},
  //   component: resolve => require(['../components/common/Home.vue'], resolve),
  //   children: [{
  //     name: 'user',
  //     path: '/user',
  //     component: resolve => require(['../components/page/user/user.vue'], resolve)
  //   }]
  // },
]
