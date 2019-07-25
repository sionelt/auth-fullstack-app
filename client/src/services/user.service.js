import Api from './api.service'

const User = {
  async getCurrentUser () {
    try {
      const { data } = await Api.get('/users/me')

      return data
    } catch (error) {
      throw error
    }
  },

  async updateCurrentUser (user) {
    try {
      const { firstName, lastName, email, password } = user
      const { data } = await Api.put('/users/me', { firstName, lastName, email, password })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default User
