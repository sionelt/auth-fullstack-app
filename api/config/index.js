module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb: {
    uri: `mongodb://${process.env.DATABASE_URI}`,
  },
}
