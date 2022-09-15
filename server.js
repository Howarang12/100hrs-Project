const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
require('dotenv').config()

const app = express()

//set view engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

//serve static files
app.use(express.static('public'))

//connect mongodb
// mongoose.connect(process.env.MONGO_URI, () => {
//   console.log('connected to mongodb...')
// })

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
// }))

//initialize passport
// app.use(passport.initialize())
// app.use(passport.session())

//home route
app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user-route'))

app.listen(process.env.PORT || 3000, console.log('Server running...'))