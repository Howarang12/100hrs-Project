const express = require('express')
const router = express.Router()

//login
router.get('/login', (req, res) => {
  res.send('Login')
})

//login
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router