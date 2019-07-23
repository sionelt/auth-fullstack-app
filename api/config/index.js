const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, './.env') })

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
}
