const express = require('express');
const purchasecontroller = require('../controllers/purchasecontroller');
const router = express.Router();

 router.post('/', purchasecontroller.createPurchase);
 router.get('/', purchasecontroller.getAllPurchases);
 router.get('/:id', purchasecontroller.getPurchaseById);
 router.delete('/:id', purchasecontroller.deletePurchase);
 router.put('/:id', purchasecontroller.updatePurchase);


 module.exports = router;