const mongoose=require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connect to Db");
    })
}

module.exports=connectToDB