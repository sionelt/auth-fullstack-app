module.exports = {
  catch404: () => (req, res, next) => {
    const err = new Error('Not Found')

    err['status'] = 404

    next(err)
  },

  catchAll: () => (error, req, res, next) => {
    const { status, message } = error

    console.error(message)

    res.status(status || 500).json({
      success: false,
      message,
    })
  },
}
