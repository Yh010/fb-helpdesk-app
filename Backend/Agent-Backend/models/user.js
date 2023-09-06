const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  facebookId: String,
  name: String,
  email: String,
});

module.exports = mongoose.model('User', userSchema);
