const authRoutes = require('./entities/auth/auth.routes')
const userRoutes = require('./entities/user/user.routes')

module.exports = Router => {
  const route = Router()

  authRoutes(route)
  userRoutes(route)

  return route
}
