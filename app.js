const express=require('express')
const userRouter=require('./routes/user.route')
const app=express()
app.set('view engine','ejs')
const PORT=3000


app.use('/user',userRouter)
app.listen(PORT,()=>{
    console.log("runnig at port: "+PORT)
})