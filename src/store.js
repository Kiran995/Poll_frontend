import Vuex from 'vuex'
import Vue from 'vue'
import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { 
    token: localStorage.getItem('user-token')
  },
  mutations: {
    update_token (state, data) {
      state.token = data
      localStorage.setItem('user-token', state.token)
    },
    logout(state){
      state.token = null
      localStorage.removeItem('user-token')
    }
  },
  actions: {
    logout({commit}){
      commit('logout')
      router.push({
        name:'Login'
      })
    }
  }
})

export default store
