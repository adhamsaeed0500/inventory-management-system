const express = require('express');
const suppliercontroller = require('../controllers/suppliercontroller');
const router = express.Router();


 router.post('/create', suppliercontroller.createSupplier);
 router.get('/', suppliercontroller.getAllSuppliers);



 module.exports = router;