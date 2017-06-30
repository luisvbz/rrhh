import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/login', component: load('Login') }, // login
    { path: '/',
      component: load('App'),
      children: [
        {
          path: '/',
          component: load('Index')
        },
        {
          path: '/constancia',
          component: load('Constancia')
        },
        {
          path: '/perfil',
          component: load('Perfil')
        },
        {
          path: '/recibos/2017',
          component: load('Sp2017')
        },
        {
          path: '/recibos/2016',
          component: load('Sp2016')
        }
      ] },
    { path: '*', component: load('Error404') } // Not found
  ]
})
