const mongoose = require('mongoose')

const models = require('../models')
const config = require('../config')

module.exports = async () => {
  try {
    const { connection } = await mongoose.connect(config.mongodb.uri, { useNewUrlParser: true })

    console.log('> Database connectioned... ')

    return (req, res, next) => {
      req.db = connection.db
      req.models = models

      next()
    }
  } catch (error) {
    throw error
  }
}
