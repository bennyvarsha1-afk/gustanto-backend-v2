const express = require('express');
const router = express.Router();
const { createSale, getTodaySales, getMonthlySales } = require('../controllers/salesController');
router.post('/', createSale);
router.get('/today', getTodaySales);
router.get('/monthly', getMonthlySales);
module.exports = router;