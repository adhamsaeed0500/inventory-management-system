const express = require('express');
const purchasecontroller = require('../controllers/purchasecontroller');
const router = express.Router();

 router.post('/', purchasecontroller.createPurchase);

 module.exports = router;