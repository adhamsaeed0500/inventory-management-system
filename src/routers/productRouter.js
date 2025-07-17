const express = require('express');
const productController = require('../controllers/productcontroller');
const router = express.Router();

 router.post('/', productController.addProducts);
 router.get('/', productController.getAllProducts);


 module.exports = router;
