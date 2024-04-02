const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const  jwt = require("jsonwebtoken")

const xyzSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//middleware to generate JWT json web token
xyzSchema.methods.generateAuthToken = async function(){
    try {
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},"mynameisgauravvermafromsgtuniversity");
        this.tokens =  this.tokens.concat({token:token});
        await this.save()
        return token
        } catch (error) {
        console.log(error);
    }
}


// middle wware to generate hash password
xyzSchema.pre("save", async function (next) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 4)
    console.log(`the current password is ${this.password}`);
    next();
})


//Now we need to create our collection by using the schema 
const Register = new mongoose.model("Register2", xyzSchema)

module.exports = Register