const express = require('express');
const userController = require('../controllers/usercontroller');
const { authorize } = require('../middlewares/authorization');
const router = express.Router();

 router.post('/signup',authorize(['admin']), userController.signup);
 router.post('/signin', userController.signin );
 router.post('/signout', userController.signout);

 module.exports = router;
