import axios from 'axios'

import config from '@config'

const Instance = axios.create({
  baseURL: config.restApiEndpoint,
  timeout: 20000
})

Instance.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('jwtToken')}`

    return config
  },
  error => Promise.reject(error)
)

Instance.interceptors.response.use(
  response => response,
  error => {
    const { response, code } = error

    if (response) {
      error.message = response.data.message
    } else if (code === 'ECONNABORTED') {
      /*
        `code` ECONNABORTED flagged for pending over setted timeout
      */
      error.message = `It looks you're experiencing some network issues!`
    }

    return Promise.reject(error)
  }
)

export default Instance
