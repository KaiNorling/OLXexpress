//USER SCHEMA MONGOOSE it is equal to COLLECTION
const mongoose = require("mongoose");
const adsSchema = new mongoose.Schema({

    title:{type:String, max:[100, "Category Name is too long"], min:[2, "Category Name is too short"],required:true,},
    description:{ type:String,required:true, },
    location:{ type:String,required:true, },
    price:{type:String,min:0,required:true,},
    currency:{ type:String,required:true, },
    phone:{type:String,required:true,},
    photos:[String],
    category_id:{type:mongoose.Schema.ObjectId, ref:"categories"},
    owner_id:{type:mongoose.Schema.ObjectId, ref:"users"},
    slug:{type:String, unique:true,required:true,},

});

const ads = mongoose.model("ads", adsSchema )
module.exports= ads;



