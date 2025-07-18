const Purchase = require('../models/purchasemodel');
const Supplier = require('../models/suppliermodel');
const Product = require('../models/productmodel');
const {purchaseSchema} = require('../middlewares/validator');


exports.createPurchase = async (req, res) => {
  const { supplier, products, totalPrice, invoiceNumber } = req.body;

  const { error } = purchaseSchema.validate({ supplier, products, totalPrice, invoiceNumber });
  if (error)
    return res.status(400).json({ success: false, message: 'Validation error', error: error.message });

  try {
    const existingSupplier = await Supplier.findById(supplier);
    if (!existingSupplier)
      return res.status(404).json({ success: false, message: 'Supplier not found' });

    for (const item of products) {
      const exists = await Product.findById(item.product);
      if (!exists)
        return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
    }

    const savedPurchase = await Purchase.create(req.body);
    res.status(200).json({ success: true, message: 'Purchase created successfully', result: savedPurchase });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
