const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: String,
});

module.exports = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
