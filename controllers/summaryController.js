const Sale = require('../models/Sale');
const Expense = require('../models/Expense');
exports.getTodaySummary = async (req, res) => {
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date(); end.setHours(23, 59, 59, 999);
  const sales = await Sale.find({ createdAt: { $gte: start, $lte: end } });
  const expenses = await Expense.find({ date: { $gte: start, $lte: end } });
  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  res.json({ sales: totalSales, expenses: totalExpenses, profit: totalSales - totalExpenses });
};