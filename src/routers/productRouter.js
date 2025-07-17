const express = require('express');
const productController = require('../controllers/productcontroller');
const router = express.Router();

 router.post('/', productController.addProducts);
 router.get('/', productController.getAllProducts);
 router.get('/low-stock', productController.getLowProduct);
 router.get('/:id', productController.getProductById);
 router.delete('/:id', productController.deleteProductById);
 router.put('/:id', productController.updateProductById);


 module.exports = router;
