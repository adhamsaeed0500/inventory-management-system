const Supplier = require('../models/suppliermodel');


exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json({ success: true, result: supplier });
  } catch (error) {
    res.status(400).json({ success: false, message: 'An error occured during creating supplier', error: error.message });
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().select('name phone address').lean();
    res.status(200).json({ success: true, result: suppliers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occured during retrieving suppliers', error: error.message });
  }
};

