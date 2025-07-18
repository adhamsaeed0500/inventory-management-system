const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('./cron/lowStockNotifier');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const notificationRouter = require('./routers/notificationRouter');
const supplierRouter = require('./routers/supplierRouter');
const purchaseRouter = require('./routers/purchaseRouter');
const saleRouter = require('./routers/saleRouter');
const reportRouter = require('./routers/reportRouter');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect("mongodb://localhost:27017/inventory_DB")
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.use('/user',userRouter); 
app.use('/products',productRouter); 
app.use('/notification',notificationRouter);
app.use('/supplier',supplierRouter); 
app.use('/purchase',purchaseRouter);
app.use('/sale',saleRouter);
app.use('/reports',reportRouter);

module.exports = app;