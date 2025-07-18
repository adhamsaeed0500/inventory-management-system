const express = require('express');
const suppliercontroller = require('../controllers/suppliercontroller');
const router = express.Router();


 router.post('/create', suppliercontroller.createSupplier);



 module.exports = router;