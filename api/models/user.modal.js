const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter a first name'],
      index: true,
    },

    lastName: {
      type: String,
      required: [true, 'Please enter a last name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
)

module.exports = User
