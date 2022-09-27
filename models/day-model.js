const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Food = require('./food-model')


const daySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date:{
    type: Date,
    default: Date.now()
  },
  foods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'food'
  }]
})

daySchema.post('remove', removeLinkedDocuments)

function removeLinkedDocuments(doc) {
  // doc will be the removed food document
  Food.remove({_id: { $in: doc.foods }})
}

const Day = mongoose.model('day', daySchema)


module.exports = Day