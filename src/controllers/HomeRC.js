const users = require("../model/UserModel")
const categories = require("../model/CategoryModel")
module.exports=class HomeRC{
    static async  HomeGetC(req,res){
        // const cats = await categories.find()
        // console.log(cats)
        res.render("index",{user:req.user, categories:await categories.find(),})
        

    }
}