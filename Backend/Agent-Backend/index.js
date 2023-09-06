const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const login = require('facebook-chat-api');

const app = express();

// Middleware
app.use(bodyParser.json());

// Webhook for Facebook Messenger
app.post('/webhook', (req, res) => {
  // Handle incoming messages here
  console.log('Received a message:', req.body);

  // Process the message and reply as needed
  // Use the facebook-chat-api library to send messages back
  // api.sendMessage('Hello, this is your bot!', req.body.senderId);

  res.sendStatus(200); // Respond to the webhook with a 200 OK status
});

const VERIFY_TOKEN = 'my_verify_token_123';

// Webhook verification
app.get('/webhook', (req, res) => {
  const hubVerifyToken = req.query['hub.verify_token'];

  if (hubVerifyToken === VERIFY_TOKEN) {
    const challenge = req.query['hub.challenge'];
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403); // Forbidden if tokens do not match
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB User Model
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

// Express session and passport middleware
app.use(
  session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Agent Server is running on port ${PORT}`);
});

// Facebook Messenger API authentication
const credentials = {
  email: 'your-facebook-email@example.com',
  password: 'your-facebook-password',
};

// Authenticate with Facebook Messenger API
login(credentials, (err, api) => {
  if (err) return console.error(err);

  // Now you can use the `api` object to interact with the Messenger API
  console.log('Connected to Facebook Messenger API');
});
