import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',//本地模拟
    // url: '/api/auth/login',//仓管
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    // url: '/api/auth/token',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',//本地模拟
    // url: '/api/auth/logout',//仓管
    method: 'post'
  })
}
