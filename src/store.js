import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
var BASEURL = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    data: []
  },
  mutations: {
    set_token: function (state, payload) {
      state.token = payload
    },
    set_data: function (state, payload) {
      state.data = payload.map((e, i) => {
        e.no = i + 1
        return e
      })
    },
    push_data: function (state, payload) {
      state.data.push(payload.todo)
    },
    search: function (state, payload) {
      state.data = state.data.filter(e => {
        return new RegExp(payload).test(e.content)
      })
    },
    edit_data: function (state, payload) {
      state.data = state.data.map(e => {
        if (e._id === payload._id) {
          e = payload
        }
        return e
      })
    },
    delete_data: function (state, payload) {
      state.data = state.data.filter(e => {
        return e._id === payload
      })
    }
  },
  actions: {
    get_token: function ({
      commit
    }, payload) {
      commit('set_token', payload)
    },
    login: function ({ commit }, payload) {
      axios.post(`${BASEURL}/users/login`, {
        email: payload.email,
        password: payload.password
      })
        .then(({data}) => {
          if (data.token) {
            localStorage.setItem('token', data.token)
            commit('set_token', data.token)
          } else {
            alert('data tidak ada')
          }
        })
        .catch(err => alert(JSON.stringify(err)))
    },
    login_fb: function ({ commit }, payload) {
      axios.post(`${BASEURL}/users/login_fb`, {
        email: payload.email,
        name: payload.name,
        id: payload.id
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          commit('set_token', data.token)
        })
        .catch(err => alert(JSON.stringify(err)))
    },
    addUser: function ({ commit }, payload) {
      axios.post(`${BASEURL}/users/addUser`, {
        email: payload.email,
        password: payload.password,
        name: payload.name
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => alert(JSON.stringify(err)))
    },
    get_data: function ({
      commit
    }, payload) {
      axios.get(`${BASEURL}/todos/findByUser`, {
        headers: {
          token: payload.token
        }
      })
        .then(({data}) => {
          commit('set_data', data)
        })
        .catch(err => alert(JSON.stringify(err)))
    },
    create_data: function ({
      commit
    }, payload) {
      axios.post(`${BASEURL}/todos/createTodo`, {
        content: payload.content,
        forDate: payload.forDate,
        weather: payload.weather
      }, {
        headers: {
          token: payload.token
        }
      })
        .then(({data}) => {
          console.log('data')
          commit('push_data', data)
        })
        .catch(err => alert(JSON.stringify(err)))
    },
    move_status: function ({
      commit
    }, payload) {
      axios.put(`${BASEURL}/todos/updateCheckList/${payload.id}`, {
        checklist: payload.checklist
      }, {
        headers: {
          token: payload.token
        }
      })
        .then(({data}) => {
          commit('edit_data', data.todo)
        })
        .catch(err => alert(JSON.stringify(err)))
    },
    destroy: function ({
      commit
    }, payload) {
      axios.delete(`${BASEURL}/todos/deleteTodo/${payload.id}`, {
        headers: {
          token: payload.token
        }
      })
        .then(({data}) => {
          commit('delete_data', payload.id)
        })
        .catch(err => alert(JSON.stringify(err)))
    }
  }
})
