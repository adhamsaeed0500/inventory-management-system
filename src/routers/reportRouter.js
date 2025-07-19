const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportcontroller');

router.get('/daily-sales' , reportController.dailySales)

 module.exports = router;