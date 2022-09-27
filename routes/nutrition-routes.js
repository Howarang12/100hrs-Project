const express = require('express')
const router = express.Router()
const User = require('../models/user-model')
const Food = require('../models/food-model')
const Day = require('../models/day-model')
const { format, startOfToday, endOfToday } = require('date-fns')

let todayDate = format(new Date(), "yyyy-MM-dd")


router.get('/', (req, res) => {
  res.render('nutrition', {user: req.user, foods: []})
})

router.post('/search', async (req, res) => {
  const params = {
    api_key: process.env.FOOD_API_KEY,
    query: req.body.search,
    dataType: ['Survey (FNDDS)'],
    pagesize: 24
  }

  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

  try{
    const response = await fetch(api_url)
    const data = await response.json()
    const foods = data.foods

    res.render('nutrition', {user: req.user, foods: foods})

  } catch(err) {
    console.log(err)
  }
  
})

router.post('/add-food', async (req, res) => {
  
  const food = await new Food({
    name: req.body.name,
    serving: req.body.serving,
    protein: req.body.protein,
    fat: req.body.fat,
    carbohydrate: req.body.carbohydrate,
    calories: req.body.calories
  }).save()

  const today = await Day.findOneAndUpdate({
    userId: req.user.id, 
    date: {
      $gte: startOfToday(),
      $lt: endOfToday()
    }
  }, {
    $push: {foods: food.id}
  }, {
    upsert: true
  })

  res.redirect('/profile')

})

router.delete('/delete-food', async (req, res) => {
  // await Food.findByIdAndDelete({id: req.body.foodId})
  // res.json('Deleted food')
  console.log(req.body)
})


module.exports = router