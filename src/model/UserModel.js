//USER SCHEMA MONGOOSE it is equal to COLLECTION
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
   
    username:{type:String, max:[32, "Too Long Name"],min:[1,"Too less Name "],required:true},
    email:{type:String, required:true,unique:true },
    password:{type:String, required:true,},
    isVerified:{type:Boolean,required:true,default:false,}
})

const users = mongoose.model("users", userSchema);

module.exports =users