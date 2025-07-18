const Supplier = require('../models/suppliermodel');
const Product = require('../models/productmodel');



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

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).select('name phone address').lean();
    if (!supplier) return res.status(404).json({ success: false, message: 'supplier not found' });
    res.status(200).json({ success: true, result: supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occured during retrieving supplier', error: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'supplier not found' });
    res.status(200).json({ success: true, result: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occured during updating supplier', error: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const deleted = await Supplier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'supplier not found' });
    res.status(200).json({ success: true, message: 'supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occured during deleting supplier', error: error.message });
  }
};

exports.getSupplierProducts = async (req ,res) =>{
  try {
    const supplierProducts = await Product.find({supplier:req.params.id}).select('name price quantity').lean();
    if(!supplierProducts) return res.status(404).json({success:false , message:'supplierProducts not found'});
    res.status(200).json({success:true , message:'get supplierProducts successfully' , result:supplierProducts});

  } catch (error) { 
  res.status(500).json({ success: false, message: 'An error occured during retrieving supplier', error: error.message });
  }
};