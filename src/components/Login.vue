<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        <center>INICIO DE SESIÓN</center>
      </q-toolbar-title>
    </div>
    <div class="layout-view">
    	 <div class="card">
		  <img src="~assets/logorrhh.png" class="logo">
		  <div class="card-content">
		    <center>Ingrese sus datos</center>
		 </div>
		</div>
    <form v-on:submit="signin">
	  	<div class="list">
  			<div class="item two-lines">
    			<i class="item-primary">person</i>
	    		<div class="item-content">
	     	 		<input class="full-width" placeholder="Cedula" v-model="username">
	     		</div>
    		</div>
    		<div class="item two-lines">
    			<i class="item-primary">lock</i>
	    		<div class="item-content">
	     	 		<input type="password" class="full-width" placeholder="Contraseña" v-model="password">
	     		</div>
    		</div>
  		</div>
  		<div class="group">
	        <button type="submit" class="primary push btnlogin" v-if="!loading">Entrar</button>
          <button class="primary push btnlogin" v-else disabled><spinner name="facebook" :size="28" color="#fff"></spinner></button>
          
		</div>
    </form>
    </div>
</div>
</div>
  </q-layout>
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
  methods: {
    signin (event) {
      event.preventDefault()
      auth.signin(this, this.username, this.password)
    }
  }
}
</script>
<style>
.logo{
  width: 10%;
}

.btnlogin{
  width: 60%;
  padding: 1em 3em;
  margin: 1em 20%;
}
</style>
