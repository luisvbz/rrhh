<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        RRHH {{ modulo }}
      </q-toolbar-title>
    </div>

    <q-drawer ref="leftDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Menú
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="home" to="/" exact>
          Inicio
        </q-drawer-link>
        <q-drawer-link icon="person" to="/perfil" exact>
          Perfil
        </q-drawer-link>
        <hr>
        <div class="list-label">Modulos</div>
        <q-drawer-link icon="description" to="/constancia">
          Constancia
        </q-drawer-link>
        <q-drawer-link icon="attach_money" to="/recibos/2017">
          Recibos 2017
        </q-drawer-link>
        <q-drawer-link icon="attach_money" to="/recibos/2016">
          Recibos 2016
        </q-drawer-link>
        <div class="item item-link drawer-closer">
        <i class="item-primary">keyboard_arrow_lefts</i>
        <div class="item-content"  @click="auth.signout()">
        Salir
      </div></div>
      </div>
    </q-drawer>

    <router-view class="layout-view"></router-view>

    <!--<div slot="footer" class="toolbar">
      <div class="auto flex justify-center within-iframe-hide">
        <button v-go-back="'/showcase'">
          <i class="on-left animate-blink">
            replay
          </i>
          Regresar
        </button>
      </div>
      <q-toolbar-title :padding="0" class="within-iframe-only">
        Footer
      </q-toolbar-title>
    </div> -->
  </q-layout>
</template>

<script>
/* eslint-disable eol-last */
import auth from '../auth'
// import router from '../router'
export default {
  data () {
    return {
      search: '',
      auth: auth,
      modulo: ''
    }
  },
  mounted () {
    auth.check()
  }
}
</script>
