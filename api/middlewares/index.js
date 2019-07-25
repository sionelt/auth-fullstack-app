module.exports = {
  isAuth: require('./auth.middleware'),
  handleError: require('./error.middleware'),
  handleDbConnection: require('./db.middleware'),
  attachCurrentUser: require('./currentUser.middleware'),
}
