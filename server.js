const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const connectDB = require('./config/connectDb')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
require('dotenv').config()

const app = express()

// connect mongodb
connectDB()

// set view engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// serve static files
app.use(express.static('public'))

// bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

// connect flash
app.use(flash())


//initialize passport
// app.use(passport.initialize())
// app.use(passport.session())

//home route
app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user-route'))

app.listen(3000, console.log('Server running...'))