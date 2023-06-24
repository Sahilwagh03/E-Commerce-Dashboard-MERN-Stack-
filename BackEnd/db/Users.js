const mongoose = require('mongoose')

const User_Schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoose.model('users' , User_Schema)