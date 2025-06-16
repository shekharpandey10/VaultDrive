const express=require('express')
const app=express()
app.set('view engine','ejs')
const PORT=3000
app.get('/',(req,res)=>{
   res.render("index")
})

app.listen(PORT,()=>{
    console.log("runnig at port: "+PORT)
})