import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import jwt from 'jwt-simple'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          console.log('data.token:'+data.token)
          setToken(data.token)
          console.log('gettoken:'+getToken())
          commit('SET_TOKEN', data.token)

          // const decoded = jwt.decode(data.token,'9FE9DF13C0C959EF',true,'HS512')
          // console.log(JSON.stringify(decoded));
          // commit('SET_ROLES', decoded.scopes)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(state.token);
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
