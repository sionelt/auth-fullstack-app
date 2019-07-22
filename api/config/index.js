const nodeEnv = process.env.NODE_ENV

if (nodeEnv == 'development') {
  require('dotenv').config()
}

module.exports = {
  nodeEnv,
  localDevPort: process.env.LOCAL_DEV_PORT,
}
