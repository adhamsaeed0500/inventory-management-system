const express = require('express');
const { productSchema } = require('../middlewares/validator');
const supplierModel = require('../models/suppliermodel');
const Product = require('../models/productmodel');
const { get } = require('mongoose');
const productmodel = require('../models/productmodel');



exports.addProducts= async(req , res) => {
    const {name , code,  category , price , quantity , supplier } = req.body;

    const {error  ,value } = productSchema.validate({name , category , price , quantity , supplier });

    if(error)
        return res.status(400).json({success:false, message:'there is an error please try again', error:error.message})

    try {

         let existingSupplier = await supplierModel.findOne({name:supplier.name});

         if(!existingSupplier){
             existingSupplier = new supplierModel({
                name:supplier.name,
                phone:supplier.phone
            })

            await existingSupplier.save();
         }

         const product = new Product({
            name:name,
            code:code,
            category:category,
            price:price,
            quantity:quantity,
            supplier:existingSupplier._id
         });

        const savedProduct =  await product.save();

        return res.status(200).json({success:true , message:'product added successfully' , result: savedProduct})
  
    } catch (error) {
        return res.status(400).json({success:false, message:'there is an error please try again' , error:error.message})
    }
}

exports.getAllProducts = async(req , res) => {
    try {
        const products = await productmodel
            .find({})
            .select('name category price quantity')
            .populate('supplier', 'name phone')
            .lean(); 


        return res.status(200).json({
            success: true,
            result: products
        });

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'An error occured during trying to retrieve products',
            error: error.message
        });

    }
};