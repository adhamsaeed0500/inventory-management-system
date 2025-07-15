const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			required: [true, 'Name is required!'],
			trim: true,
			unique: [true, 'Name must be unique!'],
			minLength: [3, 'Name must have 3 characters!'],
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Password must be provided!'],
			trim: true,
			select: false,
		},
		role:{
			type:String,
			enum:['admin', 'staff'],
			default: 'staff'
		},
		createdAt: { 
			type: Date,
			 default: Date.now },
		verified: {
			type: Boolean,
			default: false,
		},
		verificationCode: {
			type: String,
			select: false,
		},
		verificationCodeValidation: {
			type: Number,
			select: false,
		},
		forgotPasswordCode: {
			type: String,
			select: false,
		},
		forgotPasswordCodeValidation: {
			type: Number,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);