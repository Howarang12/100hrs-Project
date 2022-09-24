const mongoose = require('mongoose')
const Schema = mongoose.Schema


const daySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date:{
    type: Date,
    default: Date.now
  },
  foods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'food'
  }]
})

const Day = mongoose.model('day', daySchema)


module.exports = Day