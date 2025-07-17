const express = require('express');
const productController = require('../controllers/productcontroller');
const router = express.Router();

 router.post('/', productController.addProducts);


 module.exports = router;
