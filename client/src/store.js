import Vue from 'vue'
import Vuex from 'vuex'

import AuthService from '@/services/auth.service'
import UserService from '@/services/user.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {},
  },

  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },

    SET_AUTH_TOKEN(state, token) {
      window.localStorage.setItem('jwtToken', token)
    },
  },

  actions: {
    async signIn(c, params) {
      try {
        const { user, token } = await AuthService.signIn(params)

        c.commit('SET_CURRENT_USER', user)
        c.commit('SET_AUTH_TOKEN', token)
      } catch (error) {
        throw error
      }
    },

    async signUp (c, params) {
      try {
        const { user, token } = await AuthService.signUp(params)

        c.commit('SET_CURRENT_USER', user)
        c.commit('SET_AUTH_TOKEN', token)
      } catch (error) {
        throw error
      }
    },

    async authWithGoogleApi (c, params) {
      try {
        const { user, token } = await AuthService.authWithGoogleApi(params)

        c.commit('SET_CURRENT_USER', user)
        c.commit('SET_AUTH_TOKEN', token)
      } catch (error) {
        throw error
      }
    },

    async signOut (c, params) {
      try {
        if (window.gapi.auth2) {
          await window.gapi.auth2.getAuthInstance().signOut()
          window.gapi.auth2.getAuthInstance().disconnect()
        }

        c.commit('SET_CURRENT_USER', {})
        c.commit('SET_AUTH_TOKEN', '')
      } catch (error) {
        throw error
      }
    },

    async getCurrentUser (c) {
      try {
        const { user } = await UserService.getCurrentUser()

        c.commit('SET_CURRENT_USER', user)
      } catch (error) {
        throw error
      }
    },

    async updateCurrentUser (c, updatedUser) {
      try {
        const { user } = await UserService.updateCurrentUser(updatedUser)

        c.commit('SET_CURRENT_USER', user)
      } catch (error) {
        throw error
      }
    },
  },
})
