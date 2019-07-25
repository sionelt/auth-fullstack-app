const { Router } = require('express')

const UserService = require('./user.service')
const middlewares = require('../../middlewares')

const route = Router()

module.exports = mainRoute => {
  mainRoute.use('/users', middlewares.isAuth, middlewares.attachCurrentUser, route)

  route.get('/me', (req, res) => {
    res.json({
      user: req.currentUser,
    })
  })

  route.put('/me', async (req, res, next) => {
    try {
      const { body, models, token } = req

      const { user } = await UserService.updateCurrentUser(body, token._id, models.userModel)

      res.json({
        user,
      })
    } catch (error) {
      next(error)
    }
  })
}
