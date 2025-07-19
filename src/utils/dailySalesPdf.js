const PDFDocument = require('pdfkit');

exports.generateDailySalesPDF = (data, res) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Daily Sales Report  ', { align: 'center' });
  doc.moveDown();

  data.forEach(report => {
    doc.fontSize(12).text(` Date: ${report._id}`);
    doc.text(` Total Revenue : ${report.totalRevenue}`);
    doc.text(` the Number of Count Sales  : ${report.totalOrders}`);
    doc.moveDown();
  });

  doc.end();
};
