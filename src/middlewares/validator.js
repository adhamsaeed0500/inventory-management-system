const Joi = require('joi');

exports.signupSchema = Joi.object({
	userName: Joi.string()
		.min(6)
		.max(60)
		.required(),
	password: Joi.string()
		.required()
});

exports.signinSchema = Joi.object({
	userName: Joi.string()
		.min(6)
		.max(60)
		.required(),
	password: Joi.string()
		.required()
});

exports.productSchema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required(),
	category: Joi.string()
		.required(),
	price:Joi.number()
		.required(),
	quantity:Joi.number()
		.required(),
	supplier:{
		name:Joi.string()
		.required(),
		phone:Joi.string()
		.required()
	}	
});


exports.purchaseSchema = Joi.object({
	supplier: Joi.string()
		.required(),
	products: Joi.array().items(
       Joi.object({
       product: Joi.string().required(),
       quantity: Joi.number().required(),
       unitPrice: Joi.number().required()
       })
       ).required(),
   totalPrice:Joi.number()
		.required(),
	invoiceNumber:Joi.string()
	.required()
});