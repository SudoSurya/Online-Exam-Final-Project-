const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userBranch: {
    type: String,
    required: true,
  },
  userNumber: {
    type: Number,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "PENDING",
  },
});

module.exports = mongoose.model("UserSchema", UserSchema);
