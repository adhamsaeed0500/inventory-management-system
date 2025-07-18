const cron = require('node-cron');
const Product = require('../models/productmodel');
const Notification = require('../models/notificationmodel');
const notification = require('../models/notificationmodel');

cron.schedule('0 0 0 1 * *', async () =>{
    const products = await Product
                .find({$expr:{$or:[{$eq:["$quantity","$minQuantityAlert"]} , {$lt:["$quantity","$minQuantityAlert"]}]}})
                .select('name quantity minQuantityAlert')
                .lean(); 

        if(products.length > 0){     
        await notification.create({
            type:"low-stock",
            title:"proudcts of low quantity",
            details:products,
        });
        }
        console.log(`the number of low products ${products.length} `);
});

