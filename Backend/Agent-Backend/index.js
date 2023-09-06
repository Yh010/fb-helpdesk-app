const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// Initialize Express
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Define your webhook endpoint (e.g., /webhook)
app.post('/webhook', (req, res) => {
  // Handle incoming messages here
  console.log('Received a message:', req.body);

  // You can process the message and reply as needed
  // Use the facebook-chat-api library to send messages back
  // Example: send a reply message
  // api.sendMessage('Hello, this is your bot!', req.body.senderId);

  res.sendStatus(200); // Respond to the webhook with a 200 OK status
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema for users (models/user.js)
const User = require('./models/user');

// Configure passport for Facebook authentication
passport.use(
  new FacebookStrategy(
    {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          const newUser = new User({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          newUser.save((err) => {
            if (err) return done(err);
            return done(null, newUser);
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

// Passport session setup
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Configure Express
app.use(require('express-session')({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Create API routes (routes/api.js)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Agent Server is running on port ${PORT}`);
});
