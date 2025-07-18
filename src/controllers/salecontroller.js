const Sale = require('../models/salemodel');
const Product = require('../models/productmodel');

exports.createSale = async (req, res) => {
  try {
    const { products, totalPrice, customerName, invoiceNumber } = req.body;

    for (const item of products) {
      const productDoc = await Product.findById(item.product);
      if (!productDoc || productDoc.quantity < item.quantity) {
        return res.status(400).json({ success: false, message: `quantity not enough ${item.product}` });
      }
      productDoc.quantity -= item.quantity;
      await productDoc.save();
    }

    const sale = await Sale.create({ products, totalPrice, customerName, invoiceNumber });
    res.status(201).json({ success: true, message: 'process completed successfuuly', result: sale });

  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occered during sale process', error: error.message });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 }).populate('products.product', 'name').lean();
    res.status(200).json({ success: true, result: sales });
  } catch (error) {
    res.status(500).json({ success: false, message: 'error during process', error: error.message });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('products.product', 'name').lean();
    if (!sale) return res.status(404).json({ success: false, message: 'not found process' });
    res.status(200).json({ success: true, result: sale });
  } catch (error) {
    res.status(500).json({ success: false, message: 'error during process ', error: error.message });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'not found process' });
    res.status(200).json({ success: true, message: 'item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occured during deletion', error: error.message });
  }
};

