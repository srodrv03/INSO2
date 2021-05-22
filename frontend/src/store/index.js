import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    emailUsuario: '',
    tipousuario:'',
    id:"",
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
    },
    setId(state, msg){
      state.id=msg
    },
    setTipo(state, msg){
      state.tipousuario = msg
    }
  },
  actions: {
  },
  modules: {
  }
})
