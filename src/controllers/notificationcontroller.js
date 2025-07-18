const Notification = require('../models/notificationmodel');

// ✅ 1. Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, result: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'an error occured during retrieving notification', error: error.message });
  }
};

