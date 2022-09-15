const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
require('dotenv').config()

const app = express()

//set view engine
app.set('view engine', 'ejs')

//serve static files
app.use(express.static('public'))


//home route
app.get('/', (req, res) => {
  res.render('home')
})
app.listen(3000, console.log('Server running...'))