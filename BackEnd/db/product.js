const mongoose = require('mongoose')

const Product_Schema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
})

module.exports = mongoose.model('products' , Product_Schema)