const express = require('express');
const { signupSchema , signinSchema} = require('../middlewares/validator');
const {jwt} = require('jsonwebtoken');
const User = require('../models/usersmodel');
const { doHash , doHashValidation} = require('../utils/hashing');
const app = express();


exports.signup = async (req, res)=>{
    const {userName , password , role} = req.body;
    const allowedRoles = ['admin', 'staff'];

    try{
        const { error, value } = signupSchema.validate({ userName, password });

        if(error){
           return res.status(400).json({success:false , message : error.details[0].message})
        }

        const existingUser = await User.findOne({userName});

        if(existingUser)
          return res.status(400).json({success:false , message : 'user aleardy exist'});


        if (!allowedRoles.includes(role)) {
         return res.status(400).json({ message: 'invalid role type' });
        }

        const hashedPassword = await doHash(password ,12);

        const newUser = new User({userName, password:hashedPassword , role});

        const result  = await newUser.save();

        return res.status(200).json({success:true , message:"user added successfully" , result});



    }catch(error){
       return res.status(400).json({success:false , message : "signup failed please try again"}) 
    }
    
}

exports.signin = async (req, res) => {
	const { userName, password } = req.body;
	try {
		const { error, value } = signinSchema.validate({ userName, password });
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const existingUser = await User.findOne({ userName }).select('+password');
		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User does not exists!' });
		}
		const result = await doHashValidation(password, existingUser.password);
		if (!result) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid credentials!' });
		}
		const token = jwt.sign(
			{
				userId: existingUser._id,
				email: existingUser.email,
				verified: existingUser.verified,
			},
            'Adham@123'
            ,
			{
				expiresIn: '8h',
			}
		);

		res
			.cookie('Authorization', 'Bearer ' + token, {
				expires: new Date(Date.now() + 8 * 3600000),
			})
			.json({
				success: true,
				token,
				message: 'logged in successfully',
			});
	} catch (error) {
				return res
				.status(400)
				.json({ success: false, message: 'there is an error ' , error:error });
	}
};

exports.signout = async (req, res) => {
	res
		.clearCookie('Authorization')
		.status(200)
		.json({ success: true, message: 'logged out successfully' });
};


