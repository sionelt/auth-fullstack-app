const nodeEnv = process.env.NODE_ENV

export default {
  nodeEnv,
  restApiEndpoint: nodeEnv === 'development' ? process.env.VUE_APP_LOCAL_REST_API_ENDPOINT : process.env.VUE_APP_REST_API_ENDPOINT
}
