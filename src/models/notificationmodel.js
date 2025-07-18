const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['low-stock', 'new-order', 'system-alert'], 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  details: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
