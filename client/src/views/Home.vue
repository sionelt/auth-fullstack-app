<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',

  data () {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: null,
      isSignup: false,
      authenticating: false,
      error: ''
    }
  },

  computed: {
    authBtnText () {
      return this.isSignup
        ? this.authenticating
          ? 'SIGNING UP...'
          : 'SIGN UP'
        : this.authenticating
          ? 'SIGNING IN...'
          : 'SIGN IN'
    },

    signUpBtnText () {
      return this.isSignup ? 'Sign in' : 'Sign up'
    },

    newPasswrodMatched () {
      return this.password === this.confirmPassword
    },

    isFormValid () {
      const signinFormValid = this.email && this.password
      const signupFormValid =
        signinFormValid &&
        this.firstName &&
        this.lastName &&
        this.newPasswrodMatched

      return this.isSignup ? signupFormValid : signinFormValid
    }
  },

  created () {
    this.signOut()
  },

  mounted () {
    window.gapi.load('auth2', () => {
      window.gapi.signin2.render('google-sign-in-btn', {
        theme: 'dark',
        longtitle: true,
        onsuccess: this.signInWithGoogle
      })
    })
  },

  methods: {
    ...mapActions(['signIn', 'signUp', 'signOut', 'authWithGoogleApi']),

    async authenticate () {
      try {
        this.authenticating = true

        if (this.isSignup) {
          await this.signUp({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          })
        } else {
          await this.signIn({
            email: this.email,
            password: this.password
          })
        }

        this.$router.push({
          name: 'profile'
        })
      } catch (error) {
        console.error(error)
        this.error = error.message
      } finally {
        this.authenticating = false
      }
    },

    async signInWithGoogle (googleUser) {
      try {
        const profile = googleUser.getBasicProfile()
        const profilePayload = {
          email: profile.getEmail(),
          firstName: profile.getGivenName(),
          lastName: profile.getFamilyName(),
          googleIdToken: googleUser.getAuthResponse().id_token
        }

        await this.authWithGoogleApi(profilePayload)

        this.$router.push({
          name: 'profile'
        })
      } catch (error) {
        console.error(error)
        this.error = error.message
      } finally {
        this.authenticating = false
      }
    }
  }
}
</script>

<template>
  <div class="container-fluid d-flex flex-column h-100 align-items-center justify-content-center">
    <div class="row w-100">
      <div class="col-xl-3 col-lg-5 col-md-7 mx-auto">
        <h1 class="text-primary text-center mb-4">Your Profile</h1>
        <b-card no-body class="p-2">
          <b-card-header class="text-center">Sign in to your Profile</b-card-header>

          <b-card-body>
            <b-alert variant="danger" :show="error" v-if="error">ERROR:  {{ error }}</b-alert>

            <div class="d-flex justify-content-center mb-4">
              <div id="google-sign-in-btn" class="g-signin2"></div>
            </div>

            <template v-if="isSignup">
              <b-form-group label="First name" label-for="first-name">
                <b-form-input
                  v-model="firstName"
                  id="first-name"
                  autocapitalize="none"
                  spellcheck="false"
                  required
                />
              </b-form-group>

              <b-form-group label="Last Name" label-for="last-name">
                <b-form-input
                  v-model="lastName"
                  id="last-name"
                  autocapitalize="none"
                  spellcheck="false"
                  required
                />
              </b-form-group>
            </template>

            <b-form-group label="Email" label-for="email">
              <b-form-input
                type="email"
                v-model="email"
                id="email"
                autocapitalize="none"
                spellcheck="false"
                required
              />
            </b-form-group>

            <b-form-group label="Password" label-for="password">
              <b-form-input
                type="password"
                v-model="password"
                id="password"
                autocapitalize="none"
                spellcheck="false"
                required
              />
            </b-form-group>

            <b-form-group
              label="Confirm password"
              label-for="confirm-password"
              :invalid-feedback="!newPasswrodMatched ? 'Not match!' : ''"
              :state="newPasswrodMatched"
              v-if="isSignup"
            >
              <b-form-input
                type="password"
                v-model="confirmPassword"
                id="confirm-password"
                autocapitalize="none"
                spellcheck="false"
                required
              />
            </b-form-group>

            <b-button
              block
              variant="primary"
              class="my-4"
              :disabled="!isFormValid"
              @click="authenticate"
            >{{ authBtnText }}</b-button>

            <b-button
              block
              id="google-sign-up-btn"
              variant="link"
              class="pb-0"
              @click="isSignup = !isSignup"
            >{{ signUpBtnText }}</b-button>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>
