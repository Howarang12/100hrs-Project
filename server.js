const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const connectDB = require('./config/connectDb')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const passportSetup = require('./config/passport')
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

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// routes
app.use('/', require('./routes/home-routes'))
app.use('/user', require('./routes/user-route'))
app.use('/auth', require('./routes/auth-routes'))

app.listen(3000, console.log('Server running...'))