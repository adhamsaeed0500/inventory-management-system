const express = require('express');
const notificationcontroller = require('../controllers/notificationcontroller');
const router = express.Router();


 router.get('/', notificationcontroller.getAllNotifications);
 router.get('/unread', notificationcontroller.getAllUnreadNotifications);
//  router.delete('/:id',notificationcontroller.deleteNotification);
//  router.put('/:id', notificationcontroller.updateStatus);


 module.exports = router;