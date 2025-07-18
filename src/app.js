const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('./cron/lowStockNotifier');

const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const notificationRouter = require('./routers/notificationRouter');

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

module.exports = app;