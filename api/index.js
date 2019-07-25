'use strict'

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const routes = require('./routes')
const { handleDbConnection, handleError } = require('./middlewares')

;(async () => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(await handleDbConnection())

  app.use('/api', routes(express.Router))

  app.use(handleError.catch404())
  app.use(handleError.catch401())
  app.use(handleError.catchAll())

  app.listen(config.port, () => {
    console.log(`REST API listening at http://locahost:${config.port}`)
  })
})()
