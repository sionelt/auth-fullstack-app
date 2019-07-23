const config = require('../config')


module.exports = () => (req, res, next) => {
  req.DB = ''

  next()
}
