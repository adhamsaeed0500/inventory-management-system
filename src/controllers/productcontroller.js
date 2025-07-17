const express = require('express');
const { productSchema } = require('../middlewares/validator');
const supplierModel = require('../models/suppliermodel');
const Product = require('../models/productmodel');



exports.addProducts = async(req , res) => {
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