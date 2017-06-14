<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable eol-last */
import auth from './auth'
// import router from '../router'
export default {
  data () {
    return {
      search: '',
      auth: auth
    }
  },
  mounted () {
    auth.check()
  }
}
</script>

<style></style>
