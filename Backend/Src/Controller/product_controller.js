
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
    try{
        const product = await Product.find().lean().exec()
        return res.send(product)
    }
    catch(err)
    {
        return res.send(err)
    }
})

module.exports = router