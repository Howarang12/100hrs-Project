const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
//User model
const User = require('../models/user-model')


// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register handler
router.post('/register', async (req, res) => {
  const { username, email, password, password2 } = req.body

  let errors = []

  // check password match
  if(password !== password2) {
    errors.push({msg: 'Passwords do not match'})
  }

  //check password length
  if(password.length < 6){
    errors.push({msg: 'Password should be at least 6 characters'})
  }

  if(errors.length > 0) {
    res.render('register', {
        errors,
        username,
        email,
        password,
        password2
      }
    )
  } else {
    // validation pass, add user to db
      let user = await User.findOne({email: email})
      if(user){
        //User exists
        errors.push({msg: 'Email is already registered'})
        res.render('register', {
          errors,
          username,
          email,
          password,
          password2
        }
      )
      } else {
        const newUser = new User({
          username,
          email,
          password
        })
        // Hash Password
        bcrypt.genSalt(10, (err, salt) => 
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if(err) throw err
            //set password to hashed 
            newUser.password = hash
            //save user
            try{
              await newUser.save()
              req.flash('success_msg', 'You are now registered and can log in')
              res.redirect('/')
            } catch (err) {
              console.log(err)
            }
            
        }))

      }
      
  }
})


//login
router.get('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/',
    failureFlash: true
  }) (req, res, next)
})

module.exports = router