const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema({
  name: {
    type: String
  },
  serving: {
    type: Number
  },
  protein: {
    type: Number
  },
  fat: {
    type: Number
  },
  carbohydrate: {
    type: Number
  },
  calories: {
    type: Number
  }
})

const Food = mongoose.model('food', foodSchema)

module.exports = Food