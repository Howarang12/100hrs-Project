const express = require('express')
const router = express.Router()
//User model
const User = require('../models/user-model')

const bcrypt = require('bcryptjs')

//login
router.get('/login', (req, res) => {
  res.send('Login')
})

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
              res.redirect('/')
            } catch (err) {
              console.log(err)
            }
            
        }))

      }
      
  }
})

module.exports = router