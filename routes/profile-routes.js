const router = require('express').Router()
const authCheck = require('../middleware/ensureAuth')
const Day = require('../models/day-model')
const Food = require('../models/food-model')
const { format, startOfDay, startOfToday, endOfDay, endOfToday } = require('date-fns')

router.post('/get-day', async (req, res) => {
  const dayValues = req.body.day.split('-')

  const day = await Day.findOne({
    userId: req.user.id, 
    date: {
      $gte: startOfDay(new Date(dayValues)),
      $lt: endOfDay(new Date(dayValues))
    }
  })
  console.log(day)
  res.redirect('/profile')
})

router.get('/', authCheck.ensureAuth,  async (req, res) => {
  const today = await Day.findOne({
    userId: req.user.id, 
    date: {
      $gte: startOfToday(),
      $lt: endOfToday()
    }
  })

  const foods = await Food.find()

  res.render('profile', {user: req.user, today, foods})
})

module.exports = router