const express = require('express');
const router = express.Router();
const { getTodaySummary } = require('../controllers/summaryController');
router.get('/today', getTodaySummary);
module.exports = router;