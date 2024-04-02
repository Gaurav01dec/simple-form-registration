const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const xyzSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
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

xyzSchema.pre("save",async function(next){
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password,4)
    console.log(`the current password is ${this.password}`);
    next();
})

//Now we need to create our collection by using the schema 
const Register = new mongoose.model("Register2",xyzSchema)

module.exports=Register