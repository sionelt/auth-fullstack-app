module.exports = {
  catch404: () => (req, res, next) => {
    const err = new Error('Not Found')

    err['status'] = 404

    next(err)
  },

  catch401: () => (error, req, res, next) => {
    const { name, status, message } = error

    if (name === 'UnauthorizedError') {
      return res
        .status(status)
        .json({
          message,
        })
        .end()
    }

    return next(error)
  },

  catchAll: () => (error, req, res, next) => {
    const { name, status, message, stack } = error

    console.error(message)
    console.error(stack)

    res.status(status || 500).send({ message })
  },
}
