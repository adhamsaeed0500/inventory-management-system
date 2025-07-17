const express = require('express');
const productController = require('../controllers/productcontroller');
const router = express.Router();

 router.post('/', productController.addProducts);
 router.get('/', productController.getAllProducts);
 router.get('/:id', productController.getProductById);


 module.exports = router;
