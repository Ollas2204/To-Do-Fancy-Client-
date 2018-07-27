import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
var base_url = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    token: null,
    data: []
  },
  mutations: {
    set_token: function (state, payload) {
      state.token = payload
    },
    set_data: function (state, payload) {
      state.data = payload
    }
  },
  actions: {
    get_token: function ({
      commit
    }, payload) {
      commit('set_token', payload)
    },
    login: function ({ commit }, payload) {
      axios.post(`${base_url}/users/login`, {
        email: payload.email,
        password: payload.password
      })
        .then(({data}) => {
          console.log(data)
          commit('set_token', data.token)
        })
        .catch(console.log)
    },
    addUser: function ({ commit }, payload) {
      axios.post(`${base_url}/users/addUser`, {
        email: payload.email,
        password: payload.password,
        name: payload.name
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch(console.log)
    },
    get_data: function ({
      commit
    }, payload) {
      commit('set_data', payload)
    }
  }
})
