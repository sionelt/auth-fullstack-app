import config from '@config'

// init google api
window.gapi.load('auth2', () => {
  /* Ready. Make a call to gapi.auth2.init or some other API */
  window.gapi.auth2.init({
    client_id: config.google.clientId,
    scope: 'profile email'
  })
})
