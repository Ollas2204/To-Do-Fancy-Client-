<template >
  <nav>
    <div class="nav-wrapper #cddc39 lime">
      <a href="#!" class="brand-logo">Todoist Wanna Be ⛩️</a>
      <ul class="right hide-on-med-and-down">
        <li><a ><i class="material-icons">search</i></a></li>
        <li><a @click="move('login')" v-if="!token">LOGIN</a></li>
        <li><a @click="move('signup')" v-if="!token">SIGNUP</a></li>
        <li><a @click="logout()" v-if="token">LOGOUT</a></li>
        <li><a @click="menu"><i class="material-icons">create</i></a></li>
      </ul>
    </div>
    <div id="modal1" class="modal">
      <div class="modal-content Light-pink">
        <label>Description : </label>
        <input type="text" name="Description">
        <md-datepicker md-open-on-focus="false" v-model="selectedDate">
       <label>Select date</label>
     </md-datepicker>
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
  computed: {
    ...mapState(['token', 'data'])
  },
  methods: {
    menu () {
      $('#modal1').openModal()
    },
    move (to) {
      this.$emit('move', to)
    },
    logout () {
      this.move('login')
      this.$store.dispatch('get_token', null)
    }
  }
}
</script>

<style lang="css">
</style>
