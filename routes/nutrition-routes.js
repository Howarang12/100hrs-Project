const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('nutrition', {user: req.user})
})

router.post('/search', async (req, res) => {
  // const params = {
  //   api_key: 'kSoKHldy0rVKdhIIBnitlmMwqtXUlRvybKvcCH9s',
  //   query: req.body.search,
  //   dataType: ['Survey (FNDDS)'],
  //   pagesize: 5
  // }

  // const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

  // async function getData(){
  //   try{
  //     const response = await fetch(api_url)
  //     const data = await response.json()
  //     console.log(data)
  //     return data
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }
  // getData().then(data => console.log(data))
  // console.log(req.body)
  console.log(req.body)
  res.render('nutrition', {user: req.user})

})





module.exports = router