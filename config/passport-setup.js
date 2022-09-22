const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  let user = await User.findById(id)
  done(null, user)
});

//google strategy
passport.use(
  new GoogleStrategy({
  //options for the google strat
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/redirect',
}, async (accessToken, refreshToken, profile, done) => {
  //check if user already exists in db
  let currentUser = await User.findOne({googleId: profile.id})
  if(currentUser) {
    //already have the user
    done(null, currentUser)
  } else {
    //if not, create new user in db
    let newUser = await new User({
      username: profile.displayName,
      email: profile.emails[0].value,
      password: null,
      googleId: profile.id
    }).save()
    done(null, newUser)
  }

  })
)


// local strategy
passport.use(new LocalStrategy({ 
  passReqToCallback: true, 
  usernameField: 'email' 
}, 
  async (req, email, password, done) => {
    try{
      let user = await User.findOne({ email: email.toLowerCase()})
      if (!user) {
        req.flash('error', `Email ${email} not found.`)
        return done(null, false)
      }
      if (user && !user.password) {
        req.flash('error', 'Your account was registered using a sign-in provider. Sign in through your provider')
        return done(null, false)
      }
      //match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err
        if(isMatch) {
          return done(null, user)
        } else {
          req.flash('error', 'Password incorrect')
          return done(null, false)
        }
      })
      
    } catch(err) {
      return done(err)
    }
}))