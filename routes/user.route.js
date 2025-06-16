const express = require("express")
const { body, validationResult } = require('express-validator');
const router = express.Router()
const userModel=require("../models/user.model")
const bcrypt=require('bcrypt')

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


module.exports = router