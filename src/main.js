// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import VueResource from 'vue-resource'
import Quasar from 'quasar'
import router from './router'
require('vue2-filters')
require('./filters')
// import auth from './auth'

Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueResource)
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt-token')
Vue.http.options.root = 'http://150.185.9.18:8087'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
