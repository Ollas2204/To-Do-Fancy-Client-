<template>
<div class="body">
  <Navbar @move="move"/>
  <Login v-if="login && !token"/>
  <Signup @move="move" v-if="signup && !token"/>
  <Table :data="data" :token="token" v-if="token"/>
  <footer class="page-footer #cddc39 lime footerFixed">
    <FooterLogin v-if="!token"/>
    <Footer/>
  </footer>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Signup from '@/components/Signup.vue'
import Footer from '@/components/Footer.vue'
import FooterLogin from '@/components/FooterLogin.vue'
import Login from '@/components/Login.vue'
import Table from '@/components/Table.vue'
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  name: 'Welcome',
  data: () => ({
    login: true,
    signup: false,
    table: false
  }),
  components: {
    Navbar,
    Signup,
    Footer,
    FooterLogin,
    Login,
    Table
  },
  computed: {
    ...mapState(['token', 'data'])
  },
  methods: {
    ...mapActions(['get_token', 'get_data']),
    move (to) {
      switch (to) {
        case 'login':
          this.login = true
          this.signup = false
          this.table = false
          break
        case 'signup':
          this.login = false
          this.signup = true
          this.table = false
          break
        case 'table':
          this.login = false
          this.signup = false
          this.table = true
          break
        default:
          this.login = false
          this.signup = false
          this.table = false
      }
    }
  }
}
</script>

<style scoped>
#wellcome {
  text-align: center;
}

#room {
  display: block;
  background-color: lightgrey;
  min-height: 100%;
  padding-bottom: 180px;
}

.footerFixed {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
