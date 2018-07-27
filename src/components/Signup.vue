<template>
  <div class="col 12 m6">
    <div class="card-panel grey lighten-3">
      <h5>Are you new? Please fill your information here</h5>
      <div class="input-field">
        <input type="text" placeholder="Name">
      </div>
      <div class="input-field">
        <input type="text" placeholder="Email">
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
      <br>
      <input type="submit" value="Submit" class="btn lime">
    </div>
  </div>

</template>

<script>
export default {
  name : 'Signup'
}
</script>

<style scoped >
</style>
