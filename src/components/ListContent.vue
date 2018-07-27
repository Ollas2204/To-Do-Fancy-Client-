<template>
<div class="listcontent">
  <a href="https://www.brainyquote.com/topics/schedule">Quotes of the day</a>
  <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <p>
            <label>
        <input type="checkbox" class="filled-in" checked="checked" />
        <span>What are you doing today?</span>
      </label>
      <div class="card-action">
         <input type="text" class="datepicker">
          <a href="#">Add website as task</a>
        </div>
          </p>
          <input type="text" id="autocomplete-input" class="autocomplete">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'listContent'
}
</script>

<style lang="css">
</style>
