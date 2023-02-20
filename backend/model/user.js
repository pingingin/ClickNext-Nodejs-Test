const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  account_number: { type: String, default: null},
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  balance: { type: Number, default: 0},
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);