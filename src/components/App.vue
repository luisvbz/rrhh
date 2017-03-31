<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        {{ auth.user.profile.first_name }}, {{ auth.user.profile.last_name }}
      </q-toolbar-title>
      <button @click="$refs.rightDrawer.open()">
        <i>assignment</i>
      </button>
    </div>

    <q-drawer ref="leftDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Menú
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="person" to="/showcase/layout" exact>
          Perfil
        </q-drawer-link>
        <hr>
        <div class="list-label">Modulos</div>
        <q-drawer-link icon="description" to="/constancia">
          Constancia
        </q-drawer-link>
        <q-drawer-link icon="account_balance_wallet" to="/showcase/layout/tabs">
          ARC 2016
        </q-drawer-link>
        <q-drawer-link icon="attach_money" to="/showcase/layout/drawer">
          Recibos 2017
        </q-drawer-link>
        <q-drawer-link icon="attach_money" to="/showcase/layout/drawer">
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

    <q-drawer right-side swipe-only ref="rightDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Right-side Drawer
        </q-toolbar-title>
      </div>

      <p style="padding: 25px;" class="text-grey-7">
        This is yet another Drawer that does not gets displayed alongside content on
        bigger screens.
      </p>
    </q-drawer>

    <div slot="footer" class="toolbar">
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
    </div>
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
      auth: auth
    }
  },
  mounted () {
    auth.check()
  }
}
</script>
