const argon2 = require('argon2')
const { randomBytes } = require('crypto')

const updateCurrentUser = async (updatedUser, userId, userModel) => {
  try {
    const { password, ...restUser } = updatedUser

    if (password) {
      const salt = randomBytes(32)
      restUser.password = await argon2.hash(password, { salt })
      restUser.salt = salt.toString('hex')
    }

    await userModel.updateOne({ _id: userId }, restUser)

    const userRec = await userModel.findOne({ _id: userId })

    const user = userRec.toObject()

    Reflect.deleteProperty(user, 'password')
    Reflect.deleteProperty(user, 'salt')

    return {
      user
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  updateCurrentUser,
}
