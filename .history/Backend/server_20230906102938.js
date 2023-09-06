const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const keys = require('./config/keys'); // Load your app keys from a config file
const FacebookStrategy = require('passport-facebook').Strategy;


const app = express();


//Connect to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

//Set Up Sessions
const store = new MongoDBStore({
  uri: keys.mongoURI,
  collection: 'sessions',
});

app.use(
  session({
    secret: keys.sessionSecret, // Replace with a secret key
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Session expiration time (e.g., 1 week)
    },
  })
);

//Initialize Passport.js
