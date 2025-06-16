const express=require("express")
const { body, validationResult } = require('express-validator');
const router=express.Router()

router.get('/',(req,res)=>[
    res.render('register')
])

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().isLength({min:3}),
    (req,res)=>{
    const {name,email,password}=req.body
    console.log(req.body)
    res.send("user registered" +name)
})


module.exports=router