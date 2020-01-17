const state = {
    token: null,
    user: null,
    isUserLoggedIn: false
  }
const mutations = {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    }
  }
const actions ={
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }

export default {
    namespaced:true,
    state,
    actions,
    mutations,
}