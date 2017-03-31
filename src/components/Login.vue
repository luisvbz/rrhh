<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        <center>INICIO DE SESIÓN</center>
      </q-toolbar-title>
    </div>
    <div class="layout-view">
    	 <div class="card">
		  <img src="~assets/logorrhh.png">
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
	        <button type="submit" class="primary full-width">Entrar</button>
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
      password: ''
    }
  },
  methods: {
    signin (event) {
      this.entrando = true
      event.preventDefault()
      auth.signin(this, this.username, this.password)
      this.entrando = false
    }
  }
}
</script>
