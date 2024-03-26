const mongoose = require("mongoose")

const xyzSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type: Number,
        required:true
    },
    password:{
        type:String,
        required:true   
    }
})

//Now we need to create our collection by using the schema 
const Register = new mongoose.model("Register1",xyzSchema)

module.exports=Register