const express = require("express")
const { body, validationResult } = require('express-validator');
const router = express.Router()
const userModel=require("../models/user.model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.get('/', (req, res) => {
    res.render('register')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().isLength({ min: 3 }),
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid data'
            })
        }

        const {name,email,password}=req.body
        const hashPassword= await bcrypt.hash(password,10)  //password encryption
        const newUser= await userModel.create({
            name,
            email,
           password:hashPassword
        })
       res.json({newUser})

    })

    router.get('/login',(req,res)=>{
        res.render('login')
    })
    router.post('/login',
        body('name').trim().isLength({min:3}),
        body('password').trim().isLength({min:5}),
        async (req,res)=>{
            const errors=validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message:"Invalid data"
                })
            }

            const {name,password}=req.body
            const user= await userModel.findOne({
                name:name
            })

            if(!user){
                res.status(400).json({
                    message:"Username and password is incorrect"
                })
            }

            const isMatch=await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res.status(400).json({
                    message:"Username and password is incorrect"
                })
            }

            const token=jwt.sign({
                userId:user._id,
                email:user.email,
                name:user.name
            },process.env.JWT_SECRET)

            res.json({
                token
            })

            res.cookie('token',token,{ httpOnly: true })
            res.send("logged in")
    })

module.exports = router