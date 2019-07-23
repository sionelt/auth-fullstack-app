const mongoose = require('mongoose')

const models = require('../models')
const config = require('../config')

module.exports = () => {
  try {
    // const { connection } = await mongoose.connect(config.mongodb.uri)
    console.log('connection: ', config)
    return (req, res, next) => {
      req.DB = connection.db
      req.models = models

      next()
    }
  } catch (error) {
    next(error)
  }
}
