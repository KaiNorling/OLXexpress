const mongoose =require("mongoose");


const ads=require("../model/AdsModel")
const users=require("../model/UserModel")
const categories=require("../model/CategoryModel")
const sessions=require("../model/SessionsModel")
// const products = require("../models/ProductModel")
// const categories = require("../models/CategoryModel")
// const sessions = require("../models/SessionsModel")
// const messages = require("../models/MessagesModel") 


async function mongo(){

    try {

    await mongoose.connect(process.env.MONGO_URL) 
    
    

        
    } catch (error) {

        console.error("MONGO ERROR:". error + "");
        
    }




}

module.exports= mongo