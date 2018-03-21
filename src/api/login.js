import request from '@/utils/request'

const login = function(username, password) {
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

const logout = function() {
  return request({
    url: '/user/logout',//本地模拟
    // url: '/api/auth/logout',//仓管
    method: 'post'
  })
}

export{
  login,
  logout
}
