const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

passport.use(new LocalStrategy({ usernameField: 'email '}, (email, password, done) => {
  User.findOne({email: email})
    .then(user => {
      if(!user){
        return done(null, false, {message: 'That email is not registered'})
      }

      //match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err
        if(isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Password incorrect'})
        }
      })
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Login Required middleware.
 */
 exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};