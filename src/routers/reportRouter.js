const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportcontroller');

router.get('/daily-sales' , reportController.dailySales)
router.get('/daily-sales/pdf' , reportController.dailySalesPdf)

 module.exports = router;