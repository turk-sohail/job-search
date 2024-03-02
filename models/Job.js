const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,"please provide company name"],
        maxLength:50
    },
     position:{
        type:String,
        required:[true,"please provide position"],
        maxLength:50
    },
     status:{
        type:String,
        enum:["interview","declined","pending"],
        default:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"provide user"]
    }
    
},{timestamps:true})


const Job = mongoose.model("Job",jobsSchema);

module.exports = Job;