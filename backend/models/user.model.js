const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
    },
    password: {
      hash: {
        type: String,
      },
      salt: {
        type: String,
      },
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
