const express = require('express');
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
