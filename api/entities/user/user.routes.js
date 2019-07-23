module.exports = route => {
  route.get('/user', (req, res) => {
    res.json({
      success: true,
      payload: 'user',
    })
  })
}
