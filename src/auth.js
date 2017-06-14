/* eslint-disable */
import Vue from 'vue'
import router from './router'
export default {
  user: {
    authenticated: false,
    profile: null
  },
  check () {
    if (localStorage.getItem('jwt-token') !== null) {
      Vue.axios.get(
          'api/user'
      ).then(response => {
        this.user.authenticated = true
        this.user.profile = response.data.data
      })
    } else {

      router.push({path: '/login'})
    }
  },
  register (context, name, username, password) {
    Vue.axios.post(
        'api/register',
      {
        name: name,
        username: username,
        password: password
      }
    ).then(response => {
      context.success = true
    }, response => {
      context.response = response.data
      context.error = true
    })
  },
  signin (context, username, password) {
    Vue.axios.post(
        'api/login',
      {
        username: username,
        password: password
      }
    ).then(response => {
      context.error = false
      localStorage.setItem('jwt-token', response.data.meta.token)
      Vue.axios.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt-token')

      this.user.authenticated = true
      this.user.profile = response.data.data

      this.check()
      router.push({
        path: '/'
      })
      Loading.hide()
    }, response => {
      context.error = true
      context.msj = response.data.error
      Toast.create.negative({
          html: context.msj
        })
    })
  },
  signout () {
    localStorage.removeItem('jwt-token')
    this.user.authenticated = false
    this.user.profile = null

    router.push({
      path: '/login'
    })
  }
}