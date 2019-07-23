import axios from 'axios'

import config from '@config'

const Instance = axios.create({
  baseURL: config.restApiEndpoint,
  timeout: 20000
})

export default Instance
