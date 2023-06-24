const express = require('express')
const cors = require('cors')
require('./db/config')
const User = require('./db/Users')
const Product = require('./db/product')
const Jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 5000
const jwtKey = 'sahil'

const app = express()

//MiddlleWares
app.use(express.json())
//This is used to solve the issue of api when we fetch on browser reject the request becuase of differnt ports
app.use(cors()) 

app.post('/register',async (req,res)=>{

    const user = new User(req.body)
    let result =await user.save()
    result = result.toObject();
    delete result.password
    Jwt.sign({result} , jwtKey , (err,token)=>{
        if(err){
            res.send({result:'Something went wrong '})
        }
        res.send({result , auth:token})
    })
})

app.post('/login',async(req,res)=>{

    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select('-password')
        if(user){
            Jwt.sign({user} , jwtKey , (err,token)=>{
                if(err){
                    res.send({result:'Something went wrong '})
                }
                res.send({user , auth:token})
            })
        }
        else{
            res.send({result:'No User Found '})
        }
    }
    else{
        res.send({result:'No User Found'})
    }
})

app.post('/add-product',async (req,res)=>{

    let product  = new Product(req.body)
    console.log(req.body)
    let result = await product.save()
    res.send(result)

})

app.get('/products',async (req,res)=>{

    let products = await Product.find()
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send({result:"Not Found"})
    }
})

app.delete('/product/:id',async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})


app.get('/product/:id',async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({result:"Not Found"})
    }
})

app.put('/update/:id',async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        })
    res.send(result)
})

app.get('/Search/:key', async (req, res) => {
    const product_list = await Product.find(
        {
            "$or":[
                {'name':{$regex:req.params.key}},
                {'category':{$regex:req.params.key}},
                {'company':{$regex:req.params.key}}
            ]
        }
    )
    res.send(product_list)
})
app.listen(PORT)