'use strict'

const config = require('./config')
const app = require('./app')

const server = app.listen(config.localDevPort, () => {
  const { address, port } = server.address()
  console.log(`REST API listening at http://${address}:${port}`)
})
