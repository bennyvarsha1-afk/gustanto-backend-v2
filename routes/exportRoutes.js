// routes/exportRoutes.js
const express = require('express');
const { Parser } = require('json2csv');
const Sale = require('../models/Sale');
const Expense = require('../models/Expense');
const router = express.Router();

// 🧾 Export Daily Sales
router.get('/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const sales = await Sale.find({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const parser = new Parser();
    const csv = parser.parse(sales);
    res.header('Content-Type', 'text/csv');
    res.attachment('daily_sales.csv');
    return res.send(csv);
  } catch (err) {
    console.error('Daily export error:', err);
    res.status(500).send('Export error');
  }
});

// 📅 Export Monthly Summary
router.get('/monthly', async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const sales = await Sale.find({ createdAt: { $gte: startOfMonth } });
    const expenses = await Expense.find({ timestamp: { $gte: startOfMonth } });

    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = totalSales - totalExpenses;

    const summary = [{
      totalSales,
      totalExpenses,
      netProfit
    }];

    const parser = new Parser();
    const csv = parser.parse(summary);
    res.header('Content-Type', 'text/csv');
    res.attachment('monthly_summary.csv');
    return res.send(csv);
  } catch (err) {
    console.error('Monthly export error:', err);
    res.status(500).send('Export error');
  }
});

module.exports = router;
