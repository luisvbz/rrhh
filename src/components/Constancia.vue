<template>
  <div>asas</div>
</template>

<script>
import auth from '../auth'
export default {
  data () {
    return {
      auth: auth,
      codper: null
    }
  },
  mounted () {
    auth.check()
    this.codper = this.auth.user.profile.username
    console.log(this.codper)
  },
  methods: {
    getConstancia () {
    	 this.$http.get('api/constancia/'+codper).then(response => {
    	 	console.log(response)
    	 })
    }
  }
}
</script>

<style>
</style>
