const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User