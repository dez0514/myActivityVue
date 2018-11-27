import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  
  state: {
    color: '#fff'
  },
  mutations: {
    'SET-BACKGROUND-COLOR' (state, color) {
      state.color = color
      document.body.style.backgroundColor = state.color
    },
  },
  actions: {
    setBackgroundColor ({commit}, color) {
      commit('SET-BACKGROUND-COLOR', color)
    }
  },
  getters: {
   
  }
})

export default store
