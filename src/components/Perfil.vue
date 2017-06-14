<template>
  <div>
    <div class="layout-padding">
    	<q-group>
    		<center><i class="inset-shadow profile">person</i></button></center>
    		<p>
    			<h5>{{ auth.user.profile.first_name }}, {{ auth.user.profile.last_name }}</h5>
          <hr>
          <h6>Aqui puede actualizar sus datos</h6>
    		</p>
    	</q-group>
    	<q-group>
    	<form v-on:submit="actDatos()">
    	<div class="list">
    		<div class="item two-lines">
    			<i class="item-primary">lock</i>
	    		<div class="item-content">
	     	 		<input type="password" class="full-width" placeholder="Contraseña" v-model="password">
	     		</div>
    		</div>
    		<div class="item two-lines">
    			<i class="item-primary">lock</i>
	    		<div class="item-content">
	     	 		<input type="password" class="full-width" placeholder="Confirmacion de contraseña" v-model="password2">
	     		</div>
    		</div>
    		<div class="item two-lines">
    			<i class="item-primary">email</i>
	    		<div class="item-content">
	     	 		<input type="email" class="full-width"  placeholder="email"  v-model="email">
	     		</div>
    		</div>
  		</div>
  		<div class="group">
	        <button type="submit" class="primary full-width">Actualizar datos</button>
		</div>
		</form>
    	</q-group>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import {Toast} from 'quasar'
export default {
  data () {
    return {
      auth: auth,
      password: null,
      password2: null,
      email: auth.user.profile.email
    }
  },
  mounted () {
    auth.check()
  },
  methods: {
    actDatos () {
      if (this.password !== this.password2) {
        return Toast.create.negative({
          html: 'Las contraseñas deben coincidir'
        })
      }
      this.$http.post('api/usuarios/cambiarClave', {password: this.password, email: this.email}).then(response => {
        if (response.body.save === true) {
          this.password = null
          this.password2 = null
          Toast.create.positive({
            html: 'Sus datos fueron actualizados exitosamente'
          })
        }
        else {
          Toast.create.negative({
            html: 'La constancia fue enviada a su correo exitosamente'
          })
        }
      })
    }
  }
}
</script>

<style>
.profile{
	font-size: 100px;
	text-align: center;
	border-radius: 50px 50px 50px 50px;
}
h5 {
	text-align: center;
}
h6 {
	text-align: center;
}
</style>
