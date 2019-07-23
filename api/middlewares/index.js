const authMiddleware = require('./auth.middleware')
const dbMiddleware = require('./db.middleware')
const errorMiddleware = require('./error.middleware')


module.exports = {
  handleAuth: authMiddleware,
  handleDbConnection: dbMiddleware,
  handleError: errorMiddleware,
}
