'use strict'

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const routes = require('./routes')
const { handleAuth, handleDbConnection, handleError } = require('./middlewares')

const app = express()

app.use(cors())
app.use(handleAuth())
app.use(handleDbConnection())
app.use(bodyParser.json())

app.use('/api', routes(express.Router))

app.use(handleError())

app.listen(config.port, () => {
  console.log(`REST API listening at http://locahost:${config.port}`)
})
