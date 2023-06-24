const mongoose = require('mongoose')
require('dotenv').config();
const dbconnection = process.env.MONGODB_CONNECTION

mongoose.connect(dbconnection,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})

//password:- GwJjh1nZI9TxwmEB