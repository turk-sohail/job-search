const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name"],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email"
    ],
    unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        minLength:6,
    }
})


userSchema.methods.toJSON = function () {
 const user = this;
 const userObject = user.toObject();

delete userObject.password;
return userObject;
};

const User = new mongoose.model("User",userSchema);
module.exports = User