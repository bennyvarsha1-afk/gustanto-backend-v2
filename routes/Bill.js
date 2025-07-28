// models/Bill.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  items: [String], // array of item names
  total: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bill', billSchema);
