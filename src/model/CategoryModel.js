//USER SCHEMA MONGOOSE it is equal to COLLECTION

const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        max:[40, "Category Name is too long"],
        min:[2, "Category Name is too short"],
        required:true,

    },
    photo:{
        type:String,
        default:"nophoto.png",
    },





});


const categories = mongoose.model("categories", categorySchema )
module.exports= categories;



