const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  isAddRouters: state => state.permission.isAddRouters,
  roles: state => state.user.roles
}
export default getters
