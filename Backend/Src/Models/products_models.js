const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,require:true},
    price:{type:Number,require:true}
},
   {
    versionKey:false,
    timestamps:true
    }
)

module.exports = mongoose.model("product",ProductSchema)