const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  time: String,
  items: Array,
  total: Number,
});

module.exports = mongoose.models.Bill || mongoose.model('Bill', billSchema);
