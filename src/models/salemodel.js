const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerName: String,
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    unitPrice: Number
  }],
  totalPrice: Number,
  date: { type: Date, default: Date.now },
  invoiceNumber: String
});

module.exports = mongoose.model('Sale', saleSchema);