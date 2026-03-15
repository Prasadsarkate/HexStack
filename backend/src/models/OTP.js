const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['signup', 'reset'],
    default: 'signup'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes in seconds
  },
});

module.exports = mongoose.model('OTP', OTPSchema);
