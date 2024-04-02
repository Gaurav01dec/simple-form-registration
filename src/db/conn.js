const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/registrationForm").then(() => {
    console.log("mongo db connection successful");
})
