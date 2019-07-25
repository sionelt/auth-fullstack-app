import Api from './api.service'

const Auth = {
  async signIn (body) {
    try {
      const { email, password } = body

      const { data } = await Api.post('/auth/signin', { email, password })

      return data
    } catch (error) {
      throw error
    }
  },

  async signUp (body) {
    try {
      const { firstName, lastName, email, password } = body

      const { data } = await Api.post('auth/signup', { firstName, lastName, email, password })

      return data
    } catch (error) {
      throw error
    }
  },

  async authWithGoogleApi (body) {
    try {
      const { firstName, lastName, email, googleIdToken } = body

      const { data } = await Api.post('auth/google-api', { firstName, lastName, email, googleIdToken })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default Auth
