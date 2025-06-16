const express=require('express')
const userRouter=require('./routes/user.route')
const dotenv=require('dotenv')
const connectToDB=require('./config/db')

const app=express()
dotenv.config()
connectToDB()
app.set('view engine','ejs')
const PORT=3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use('/user',userRouter)
app.listen(PORT,()=>{
    console.log("runnig at port: "+PORT)
})