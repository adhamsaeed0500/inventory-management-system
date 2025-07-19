const PDFDocument = require('pdfkit');

const generateDailySalesPDF = (data, res) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Daily Sales Report  ', { align: 'center' });
  doc.moveDown();

  data.forEach(report => {
    doc.fontSize(12).text(`📅 Date: ${report.date}`);
    doc.text(`💰 Total Revenue : ${report.totalRevenue}`);
    doc.text(`🛒 the Number of Count Sales  : ${report.count}`);
    doc.moveDown();
  });

  doc.end();
};
