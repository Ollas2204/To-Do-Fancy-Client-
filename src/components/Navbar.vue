<template >
  <nav>
    <div class="nav-wrapper #cddc39 lime">
      <a href="#!" class="brand-logo">Todoist Wanna Be ⛩️</a>
      <ul class="right hide-on-med-and-down">
        <li><a @click="move('login')" v-if="!token">LOGIN</a></li>
        <li><a @click="move('signup')" v-if="!token">SIGNUP</a></li>
        <li v-if="token"><input type="text" class="white-text" placeholder="search" v-model="search"></li>
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
        <label><a href="https://www.google.co.id/search?rlz=1C5CHFA_enID781JP782&ei=OVRbW_-MBc3i-AavjqSADg&q=weather+now&oq=weather&gs_l=psy-ab.1.1.0i71k1l8.0.0.0.9587.0.0.0.0.0.0.0.0..0.0....0...1c..64.psy-ab..0.0.0....0.ubOlZVlHTOk"></a>Weather today</label>
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

export default {
  name: 'Navbar',
  data: ()=>({
    content: "",
    forDate: "",
    search: ""
  }),
  computed: {
    ...mapState(['token', 'data'])
  },
  watch:{
    search: function (item) {
      if(item != ''){
        this.$store.commit('search', item)
      }else{
        this.get_data({
          token: this.token
        })
      }
    }
  },
  methods: {
    ...mapActions(['get_token', 'create_data', 'get_data',]),
    menu () {
      $('#modal1').openModal()
    },
    move (to) {
      this.$emit('move', to)
    },
    logout () {
      this.move('login')
      localStorage.removeItem('token')
      this.$store.dispatch('get_token', null)
    },
    submit () {
      let self = this
      this.create_data({
        token: this.token,
        content: this.content,
        forDate: this.forDate
      })
      .then(()=>{
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
