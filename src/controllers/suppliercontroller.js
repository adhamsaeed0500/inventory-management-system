const Supplier = require('../models/suppliermodel');


exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json({ success: true, result: supplier });
  } catch (error) {
    res.status(400).json({ success: false, message: 'An error occured during creating supplier', error: error.message });
  }
};

