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
app.use(passport.initialize());
app.use(passport.session());

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

// Import and use route files
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});