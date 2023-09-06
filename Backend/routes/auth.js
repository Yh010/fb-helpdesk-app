/*const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for initiating Facebook authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Callback route for Facebook to redirect to after authentication
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/dashboard', // Redirect to the dashboard on successful login
    failureRedirect: '/login',    // Redirect to the login page on failed login
  })
);

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

// Initialize Passport
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user creation or authentication here
      // You can store user data in your MongoDB database
      // Call 'done' when finished
    }
  )
);

// Facebook Login Route
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
  })
);

// Facebook Callback Route
router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login'); // Redirect to login on authentication failure
    // Create a JWT or session for the user and redirect to the app's main page
  })(req, res, next);
});

module.exports = router;

//import controller
const {facebooklogin} = require

router.post('/facebooklogin',facebooklogin)
