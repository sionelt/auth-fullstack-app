module.exports = async (req, res, next) => {
  try {
    const { token, models } = req

    const userRecord = await models.userModel.findById(token._id);

    if (!userRecord) {
      return res.sendStatus(401);
    }

    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');

    req.currentUser = currentUser;

    return next();
  } catch (error) {
    return next(error);
  }
};
