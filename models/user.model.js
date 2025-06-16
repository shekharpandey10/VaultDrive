const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,"User must have at least 3 characters long"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,"email must have at least 5 characters long"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:[5,"password must have at least 5 characters long"]
    }
 })

 const User=mongoose.model('user',userSchema)
 module.exports=User