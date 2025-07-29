const express = require('express');
const router = express.Router();
const Order = require('../models/Bill'); // or wherever your Bill model is

// Route to return monthly summary (for chart)
router.get('/monthly', async (req, res) => {
  try {
    const sales = await Order.find();
    const summary = {};

    sales.forEach(s => {
      const date = s.time.split('T')[0];
      if (!summary[date]) summary[date] = 0;
      summary[date] += s.total;
    });

    const data = Object.keys(summary).map(date => ({
      date,
      total: summary[date],
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching monthly summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
