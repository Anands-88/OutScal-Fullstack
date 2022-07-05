
const express = require("express")
const Product = require("../Models/products_models")
const router = express.Router();

router.post("",async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        return res.send("Product data added")
    }
    catch(err)
    {
        return res.send(`${err}- failed to add`)
    }
})

router.get("",async(req,res)=>{

    const page = req.query.page || 1;
    const size = 15;
    let filter = req.query.filter 
    let sort = req.query.sort
    let greater = filter - 200;
    
    try{
        let product;
        let message;

        if(filter == undefined && sort == undefined)
        {
            message = "Filter undefined and sort undefined"
            product = await Product.find().skip((page-1)*size).limit(size)
            .lean().exec();
        }
        else if(filter == undefined && sort != undefined)
        {
            message = "Filter undefined and sort defined"
            product = await Product.find().skip((page-1)*size).limit(size)
            .sort({"price":sort}).lean().exec();
        }
        else if(sort == undefined && filter != undefined)
        {
            message = "Filter defined and sort undefined"
            product = await Product.find({$and:[{price:{$lte:filter}},{price:{$gte:greater}}]})
            .skip((page-1)*size).limit(size).lean().exec();
        }
        else
        {
            message = "Both defined"
            product = await Product.find({$and:[{price:{$lte:filter}},{price:{$gte:greater}}]})
            .skip((page-1)*size).limit(size)
            .sort({"price":sort}).lean().exec();
            
        }
        return res.send({product,message})
    }
    catch(err)
    {
        message = [filter,sort]
        return res.send({err,message})
    }
})

module.exports = router