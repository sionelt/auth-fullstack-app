const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter a first name'],
    },

    lastName: {
      type: String,
      required: [true, 'Please enter a last name'],
    },

    password: String,

    salt: String,

    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },

  { timestamps: true },
)

module.exports = mongoose.model('UserModel', UserSchema)
