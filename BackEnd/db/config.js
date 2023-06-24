const mongoose = require('mongoose')
require('dotenv').config();
const dbconnection = process.env.MONGODB_CONNECTION

mongoose.connect(dbconnection,{ useNewUrlParser: true })

//password:- GwJjh1nZI9TxwmEB