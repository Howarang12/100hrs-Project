const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./config/connect-db')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

//initialize app
const app = express()

// connect mongodb
connectDB()

// set view engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// serve static files
app.use(express.static('public'))

// bodyparser
app.use(express.urlencoded({ extended: true }))
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

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', require('./routes/home-routes'))
app.use('/user', require('./routes/user-route'))
app.use('/auth', require('./routes/auth-routes'))
app.use('/profile', require('./routes/profile-routes'))
app.use('/nutrition', require('./routes/nutrition-routes'))

app.listen(3000, console.log('Server running...'))