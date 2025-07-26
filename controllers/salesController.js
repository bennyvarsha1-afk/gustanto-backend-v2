const Sale = require('../models/Sale');
exports.createSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTodaySales = async (req, res) => {
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date(); end.setHours(23, 59, 59, 999);
  const sales = await Sale.find({ createdAt: { $gte: start, $lte: end } });
  res.json(sales);
};
exports.getMonthlySales = async (req, res) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const sales = await Sale.find({ createdAt: { $gte: start } });
  res.json(sales);
};