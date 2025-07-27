const express = require('express');
const { Parser } = require('json2csv');
const Bill = require('../models/Bill');
const Expense = require('../models/Expense');
const router = express.Router();

// 🧾 Export Daily Sales
router.get('/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const bills = await Bill.find({
      timestamp: { $gte: today, $lt: tomorrow }
    });

    const parser = new Parser();
    const csv = parser.parse(bills);
    res.header('Content-Type', 'text/csv');
    res.attachment('daily_sales.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).send('Export error');
  }
});

// 📅 Export Monthly Summary
router.get('/monthly', async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const bills = await Bill.find({ timestamp: { $gte: startOfMonth } });
    const expenses = await Expense.find({ timestamp: { $gte: startOfMonth } });

    const summary = {
      totalSales: bills.reduce((sum, bill) => sum + bill.total, 0),
      totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
      netProfit: bills.reduce((sum, bill) => sum + bill.total, 0)
                 - expenses.reduce((sum, e) => sum + e.amount, 0),
    };

    const parser = new Parser();
    const csv = parser.parse([summary]);
    res.header('Content-Type', 'text/csv');
    res.attachment('monthly_summary.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).send('Export error');
  }
});

module.exports = router;
