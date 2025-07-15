const Joi = require('joi');

exports.signupSchema = Joi.object({
	userName: Joi.string()
		.min(6)
		.max(60)
		.required(),
	password: Joi.string()
		.required()
});
