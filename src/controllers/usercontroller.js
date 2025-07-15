const express = require('express');
const { signupSchema} = require('../middlewares/validator');
const User = require('../models/usersmodel');
const { doHash} = require('../utils/hashing');
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