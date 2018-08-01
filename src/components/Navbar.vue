<template >
  <nav>
    <div class="nav-wrapper #cddc39 lime">
      <a href="#!" class="brand-logo">Todoist Wanna Be ⛩️</a>
      <ul class="right hide-on-med-and-down">
        <li><a @click="move('login')" v-if="!token">LOGIN</a></li>
        <li><a @click="move('signup')" v-if="!token">SIGNUP</a></li>
        <li v-if="token"><input type="white-text" placeholder="Find Me If You Can " v-model="search"></li>
        <li><a @click="logout()" v-if="token">LOGOUT</a></li>
        <li><a @click="menu"><i class="material-icons" v-if="token">create</i></a></li>
      </ul>
    </div>
    <div id="modal1" class="modal">
      <div class="modal-content Light-pink">
        <label>Description : </label>
        <input type="text" v-model="content" name="Description">
        <label>Select date</label>
        <input type="date" v-model="forDate" name="Description">
        <label>Weather today</label>
        <input disabled type="text" v-model="weather" name="Description">
      </div>
      <div class="modal-footer">
        <a href="#" class="modal-action modal-close waves-effect waves-Pink btn-flat" @click='submit()'>⛩️ Add New Task</a>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'
import axios from 'axios'
let URL_API_YAHOO = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22jakarta%2Ccn%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
export default {
  name: 'Navbar',
  data: () => ({
    content: '',
    forDate: '',
    search: '',
    weather: ''
  }),
  computed: {
    ...mapState(['token', 'data'])
  },
  watch: {
    search: function (item) {
      if (item !== '') {
        this.$store.commit('search', item)
      } else {
        this.get_data({
          token: this.token
        })
      }
    }
  },
  created(){
    let self = this
    axios.get(URL_API_YAHOO)
      .then(({data})=>{
        let item = data.query.results.channel.item
        self.weather = item.condition.temp + ' Celcius ' + item.condition.text
      })
      .catch(console.log)
  },
  methods: {
    ...mapActions(['get_token', 'create_data', 'get_data']),
    menu () {
      $('#modal1').openModal()
    },
    move (to) {
      this.$emit('move', to)
    },
    logout () {
      this.move('login')
      FB.logout(function(params) {
        return null
      })
      localStorage.clear()
      this.$store.dispatch('get_token', null)
    },
    submit () {
      let self = this
      this.create_data({
        token: this.token,
        content: this.content,
        forDate: this.forDate,
        weather: this.weather
      })
        .then(() => {
          self.get_data({
            token: this.token
          })
        })
    }
  }
}
</script>

<style scoped>
#modal1 {
  z-index:0;
}
</style>
