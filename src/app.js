const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(helmet());
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

module.exports = app;