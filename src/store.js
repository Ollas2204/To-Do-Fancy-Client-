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
      console.log('ke hit');

      axios({
        method: 'post',
        url: `http://localhost:3000/users/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
          console.log(response, 'response====');
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            commit('set_token', response.data.token)
          } else {
            alert('data tidak ada')
          }
      }).catch(err => {
        console.log(err);
      })

    },
    login_fb: function ({ commit }, payload) {
      axios.post(`http://localhost:3000/users/login_fb`, {
        email: payload.email,
        name: payload.name,
        id: payload.id
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          commit('set_token', data.token)
        })
        .catch(err => alert(JSON.stringify(err)))
    },
    addUser: function ({ commit }, payload) {

      axios({
        method: 'post',
        url: 'http://localhost:3000/users/addUser',
        data:{
          email: payload.email,
          password: payload.password,
          name: payload.name
        }
      }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })

    },
    get_data: function ({
      commit
    }, payload) {
      axios.get(`http://localhost:3000/todos/findByUser`, {
        headers: {
          token: payload.token
        }
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
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
      axios.post(`http://localhost:3000/todos/createTodo`, {
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
      axios.put(`http://localhost:3000/todos/updateCheckList/${payload.id}`, {
        checklist: payload.checklist
      }, {
        headers: {
          token: payload.token,
          'Content-Type': 'application/x-www-form-urlencoded'
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
      axios.delete(`http://localhost:3000/todos/deleteTodo/${payload.id}`, {
        headers: {
          token: payload.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(({data}) => {
          commit('delete_data', payload.id)
        })
        .catch(err => alert(JSON.stringify(err)))
    }
  }
})
