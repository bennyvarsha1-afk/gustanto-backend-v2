// controllers/summaryController.js
const Sale = require('../models/Sale');
const Expense = require('../models/Expense');

// ✅ TODAY'S SUMMARY
exports.getTodaySummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const sales = await Sale.find({ createdAt: { $gte: today, $lt: tomorrow } });
    const expenses = await Expense.find({ timestamp: { $gte: today, $lt: tomorrow } });

    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = totalSales - totalExpenses;

    res.json({ totalSales, totalExpenses, netProfit });
  } catch (err) {
    console.error('Error in getTodaySummary:', err);
    res.status(500).send('Server error');
  }
};

// ✅ MONTHLY SUMMARY (used by Chart.js)
exports.getMonthlySummary = async (req, res) => {
  try {
    const start = new Date();
    start.setDate(1); // first day of the month
    start.setHours(0, 0, 0, 0);

    const sales = await Sale.find({ createdAt: { $gte: start } });
    const expenses = await Expense.find({ timestamp: { $gte: start } });

    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = totalSales - totalExpenses;

    res.json({ totalSales, totalExpenses, netProfit });
  } catch (err) {
    console.error('Error in getMonthlySummary:', err);
    res.status(500).send('Server error');
  }
};
