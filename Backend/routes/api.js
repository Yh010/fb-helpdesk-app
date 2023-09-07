// routes/api.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model

// Endpoint for checking if a user exists by Facebook ID
router.get('/checkuser', async (req, res) => {
  try {
    const { facebookId } = req.query;

    // Check if a user with the provided Facebook ID exists in the database
    const user = await User.findOne({ facebookId });

    if (user) {
      res.json({ userExists: true });
    } else {
      res.json({ userExists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
