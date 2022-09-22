const express = require('express')
const router = express.Router()
// const fetch = require('node-fetch')


router.get('/', (req, res) => {
  res.render('nutrition', {user: req.user, foods: []})
})

router.post('/search', async (req, res) => {
  const params = {
    api_key: process.env.FOOD_API_KEY,
    query: req.body.search,
    dataType: ['Survey (FNDDS)'],
    pagesize: 10
  }

  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

  try{
    const response = await fetch(api_url)
    const data = await response.json()
    
    let foods = data.foods
    console.log(data.foods[0].foodNutrients)
    res.render('nutrition', {user: req.user, foods: foods})

  } catch(err) {
    console.log(err)
  }
  
})


module.exports = router