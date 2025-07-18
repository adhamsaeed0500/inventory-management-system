const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    unitPrice: Number
  }],
  totalPrice: Number,
  date: { type: Date, default: Date.now },
  invoiceNumber: { type: String, unique: true }
});

module.exports = mongoose.model('Purchase', purchaseSchema);