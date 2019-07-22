'use strict'

const express = require('express')
const cors = require('cors')

const routes = require('./routes')
const { handleError } = require('./middlewares')

const app = express()

app.use(cors())
app.use('/auth', routes(express.Router))
app.use(handleError())

module.exports = app
