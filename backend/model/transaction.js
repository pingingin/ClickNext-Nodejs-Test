const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, default: null},
  sender: { type: String, default: null },
  receiver: { type: String, default: null },
  date: { type: String, default: null },
  amount: { type: Number, default: 0},
  type: { type: String, default: null },
  remain: { type: Number, default: null},
});

module.exports = mongoose.model("transaction", transactionSchema);