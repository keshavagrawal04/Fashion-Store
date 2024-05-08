const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expiryTime: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Otp", otpSchema);
