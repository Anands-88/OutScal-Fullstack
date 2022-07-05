
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
    let filter = req.query.filter 
    let sort = req.query.sort
    let greater = filter - 200;
    console.log(sort,"Price","filter",filter)
    try{
        let product;
        if(filter === undefined && sort === undefined)
        {
            product = await Product.find().lean().exec();
        }
        else if(filter === undefined && sort !== undefined)
        {
            product = await Product.find()
            .sort({"price":sort}).lean().exec();
        }
        else if(sort === undefined && filter !== undefined)
        {
            product = await Product.find({$and:[{price:{$lte:filter}},{price:{$gte:greater}}]})
        }
        else
        {
            product = await Product.find({$and:[{price:{$lte:filter}},{price:{$gte:greater}}]})
            .sort({"price":sort}).lean().exec();
            
        }
        return res.send(product)
    }
    catch(err)
    {
        return res.send(err)
    }
})

module.exports = router