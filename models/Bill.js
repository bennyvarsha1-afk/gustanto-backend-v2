const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  items: [String], // List of item names
  total: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', billSchema); // ✅ Must be 'Sale'
