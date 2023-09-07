// Import necessary modules and configurations
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const keys = require('./config/keys'); // Load your app keys from a config file
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

// Connect to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Set Up Sessions
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

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback', // Facebook will redirect here after authentication
      profileFields: ['id', 'displayName', 'emails'], // Define the fields you want to retrieve
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user with the Facebook ID already exists in your database
        const existingUser = await User.findOne({ facebookId: profile.id });

        if (existingUser) {
          // User already exists, so return that user
          return done(null, existingUser);
        }

        // User does not exist, so create a new user
        const newUser = new User({
          facebookId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value, // Assuming the first email is the primary email
        });

        // Save the new user to your MongoDB database
        await newUser.save();

        // Return the newly created user
        done(null, newUser);
      } catch (error) {
        // Handle any errors that occur during user creation or authentication
        done(error, false);
      }
    }
  )
);

// Import and use route files
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api'); // Import your API route
app.use('/auth', authRoutes);
app.use('/api', apiRoutes); // Mount the API route at /api

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
