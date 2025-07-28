const express = require('express');
const router = express.Router();
const { getTodaySummary, getMonthlySummary } = require('../controllers/summaryController');

router.get('/today', getTodaySummary);
router.get('/monthly', getMonthlySummary); // ✅ Add this line

module.exports = router;
