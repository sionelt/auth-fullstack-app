module.exports = (route) => {
  route.get('/auth', (req, res) => {
    res.json({
      success: true,
      payload: 'auth'
    })
  })
}
