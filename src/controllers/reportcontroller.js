const Report = require('../models/reportmodel');
const Sale = require('../models/salemodel');
const { generateDailySalesPDF } = require('../utils/dailySalesPdf');



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

exports.dailySalesPdf = async (req, res) => {
  try {
    const reports = await Report.find({ type: 'Daily-Sales' }).select('data').lean();
    const reportData = reports.map(r => r.data).flat();

    generateDailySalesPDF(reportData, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occured during generate PDF', error: error.message });
  }
};

