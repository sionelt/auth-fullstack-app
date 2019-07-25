

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  googleApi: {
    clientId: process.env.GOOGLE_API_CLIENT_ID,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET
  }
}
