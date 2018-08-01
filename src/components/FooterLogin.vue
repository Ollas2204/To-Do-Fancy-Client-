<template >
<div class="container">
  <div class="row">
    <div class="col l6 s12">
      <p class="white-text">This app is for compliting phase 2 on Hackti8</p>
    </div>
    <div class="col l4 offset-l2 s12">
      <h5 class="white-text">Login Option</h5>
      <ul>
        <li>
          <fb-signin-button
            :params="fbSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Sign in with Facebook
          </fb-signin-button>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FooterLogin',
  data () {
    return {
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      },
    }
  },
  methods: {
    onSignInSuccess (response) {
      FB.api('/me', dude => {
        this.$store.dispatch('login_fb', {
          name: dude.name,
          id: dude.id,
          email: dude.email
        })
      })
    },
    onSignInError (error) {
      alert(JSON.stringify(error))
    }
  }
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
