const express = require('express');
const suppliercontroller = require('../controllers/suppliercontroller');
const router = express.Router();


 router.post('/create', suppliercontroller.createSupplier);
 router.get('/', suppliercontroller.getAllSuppliers);
 router.get('/:id', suppliercontroller.getSupplierById);
 router.delete('/:id', suppliercontroller.deleteSupplier);
 router.put('/:id', suppliercontroller.updateSupplier);





 module.exports = router;