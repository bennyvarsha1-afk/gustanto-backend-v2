const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: String,
});

delete mongoose.connection.models['Expense'];
module.exports = mongoose.model('Expense', expenseSchema);
