const Report = require('../models/reportmodel');
const Sale = require('../models/salemodel');


exports.dailySales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    await Report.create({type:'Daily-Sales' , data:sales});

    res.status(200).json({ success: true, result: sales });
  } catch (error) {
    res.status(500).json({ success: false, message: 'an error occured during generate dailySaling Reprot', error: error.message });
  }
};
