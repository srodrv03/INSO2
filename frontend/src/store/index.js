import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    emailUsuario: ''
  },
  plugins: [createPersistedState()],
  mutations: {
    logearse(state){
      state.logged = true
    },
    deslogearse(state){
      state.logged = false
      state.emailUsuario = ''
    },
    setEmail(state, msg){
      state.emailUsuario = msg
    }
  },
  actions: {
  },
  modules: {
  }
})
