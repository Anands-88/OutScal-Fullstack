const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const productController = require("./Controller/product_controller")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/product",productController)

const port = process.env.PORT || 3000
const db = process.env.DB

app.listen(port, async ()=>{
    try{
        await mongoose.connect(db)
        console.log("Connected to port",port)
    }
    catch(err)
    {
        console.error("Failed to Connect")
    }
})