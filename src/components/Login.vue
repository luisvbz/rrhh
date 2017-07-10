<template>
  <!-- root node required -->
  <div class="body">
    <div class="row">
      <div class="name">
          <h4>RRHH Unermb</h4>
      </div>
    </div>
    <div class="row">
      <div class="logo-container">
        <div class="logo">
          <img src="~assets/logo.png">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="buttons-container">
        <form v-on:submit="signin">
          <input class="input" type="text" placeholder="Cedula" v-model="username">
          <input type="password" placeholder="Contraseña" v-model="password">
        <button type="submit" class="deep-orange push full-width"  v-if="!loading">
            ENTRAR
        </button>
        <button v-else class="deep-orange push full-width">
            <spinner name="tail" :size="20" color="#fff"></spinner>
        </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable eol-last */
import auth from '../auth'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: false,
      msj: null,
      loading: false
    }
  },
  beforeCreate () {
    document.body.className = 'login'
  },
  methods: {
    signin (event) {
      event.preventDefault()
      auth.signin(this, this.username, this.password)
    }
  }
}
</script>


<style lang="stylus">

body
  font-family: 'Roboto', sans-serif
  display: -webkit-flex
  display: -ms-flexbox
  display: flex
    
  webkit-justify-content: center
  ms-flex-pack: center
  justify-content: center
    
  webkit-align-items: center
  ms-flex-align: center
  align-items: center

.name
  width: 100%
  text-align: center
  color: white


.logo-container
  width: 100%
  text-align: center
  padding-top: 15px
  padding-bottom: 15px

.buttons-container
  padding-top: 15px
  width: 80%
  margin: 0 auto

img
  width: 40%
  height: 40%
  margin: 0 auto

input:not(.no-style)
  background-color: #FFFFFF
  max-width: 100%
  font-size: 0,9rem
  padding: 8px
  width: 100%
  margin-bottom: 10px


</style>
