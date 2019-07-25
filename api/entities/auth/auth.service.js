const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const { randomBytes } = require('crypto')
const { OAuth2Client } = require('google-auth-library')

const config = require('../../config')

const GoogleOAuth2Client = new OAuth2Client(config.googleApi.clientId)

const generateToken = (user, exp) => {
  try {
    return jwt.sign(
      {
        _id: user._id,
        exp: exp || Math.floor(Date.now() / 1000) + 60 * 60,
      },
      config.auth.jwtSecret
    )
  } catch (error) {
    throw error
  }
}

const signUp = async (creds, userModel) => {
  try {
    const { firstName, lastName, email, password } = creds

    const salt = randomBytes(32)
    const hashedPassword = await argon2.hash(password, { salt })

    const userRec = await userModel.create({
      email,
      lastName,
      firstName,
      password: hashedPassword,
      salt: salt.toString('hex'),
    })

    const user = userRec.toObject()
    Reflect.deleteProperty(user, 'password')
    Reflect.deleteProperty(user, 'salt')

    return {
      user,
      token: generateToken(user),
    }
  } catch (error) {
    throw error
  }
}

const signIn = async (creds, userModel) => {
  try {
    const { email, password } = creds

    const userRec = await userModel.findOne({ email })

    if (!userRec) {
      throw new Error('User not found. Sign up first.')
    }

    const isValidPassword = await argon2.verify(userRec.password, password)

    if (isValidPassword) {
      const user = userRec.toObject()
      Reflect.deleteProperty(user, 'password')
      Reflect.deleteProperty(user, 'salt')

      return {
        user,
        token: generateToken(user),
      }
    } else {
      throw new Error('Invalid password')
    }
  } catch (error) {
    throw error
  }
}

const authWithGoogleApi = async (creds, userModel) => {
  try {
    const { firstName, lastName, email, googleIdToken } = creds

    const ticket = await GoogleOAuth2Client.verifyIdToken({
      idToken: googleIdToken,
      audience: config.googleApi.clientId,
    })

    const payload = ticket.getPayload()
    const exp = parseInt(payload['exp'], 10)

    let userRec = await userModel.findOne({ email })

    if (!userRec) {
      userRec = await userModel.create({
        firstName,
        lastName,
        email,
      })
    }

    const user = userRec.toObject()
    Reflect.deleteProperty(user, 'password')
    Reflect.deleteProperty(user, 'salt')

    return {
      user,
      token: generateToken(user, exp),
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  signIn,
  signUp,
  authWithGoogleApi,
}
