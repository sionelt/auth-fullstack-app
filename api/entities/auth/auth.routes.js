const { Router } = require('express')

const AuthService = require('./auth.service')

const route = Router()

module.exports = mainRoute => {
  mainRoute.use('/auth', route)

  route.post('/signup', async (req, res, next) => {
    try {
      const { body, models } = req

      const { user, token } = await AuthService.signUp(body, models.userModel)

      res.status(201).json({
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  })

  route.post('/signin', async (req, res, next) => {
    try {
      const { body, models } = req

      const { user, token } = await AuthService.signIn(body, models.userModel)

      res.json({
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  })

  route.post('/google-api', async (req, res, next) => {
    try {
      const { body, models } = req

      const { user, token } = await AuthService.authWithGoogleApi(body, models.userModel)

      res.json({
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  })
}
