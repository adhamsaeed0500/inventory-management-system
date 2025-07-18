const Notification = require('../models/notificationmodel');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, result: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'an error occured during retrieving notification', error: error.message });
  }
};

exports.getAllUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({read:false}).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, result: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'an error occured during retrieving notification', error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Notification.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'notification not found' });
    }
    res.status(200).json({ success: true, message: 'notification deleted successfully'});
  } catch (error) {
    res.status(500).json({ success: false, message: 'an error occured during deleting notification', error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  try {
    const updated = await Notification.findByIdAndUpdate(id, { read }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'notification not found'});
    }
    res.status(200).json({ success: true, message: 'notification updated successfully', result: updated });
  } catch (error) {
    res.status(500).json({ success: false, message:'an error occured during updating notification', error: error.message });
  }
};
