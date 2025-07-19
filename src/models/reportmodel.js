const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  type: { type: String }, 
  generatedAt: { type: Date, default: Date.now },
  data: mongoose.Schema.Types.Mixed 
});

module.exports = mongoose.model('Report', reportSchema);