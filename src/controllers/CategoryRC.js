const users = require("../model/UserModel")
const categories = require("../model/CategoryModel")
const ads = require("../model/AdsModel")
const { isValidObjectId } = require("mongoose")


module.exports= class CategoryRC{

    static  async  CategoryGetC (req,res){
        const {id} =req.params
        if(! isValidObjectId(id)){res.redirect("/");return}
        const category= await categories.findOne({
            _id:id
        })
        if(!category) {
            res.redirect("/")
            return 0;
        }
        
        const category_ads= await ads.find({category_id:id,})

       res.render("category",{user:req.user, category: category,category_ads, } )

    }



    static  async  CategoryAllGetC (req,res){
      
       
     try {
        res.render("index",{user:req.user, categories:await categories.find(),})
        
     } catch (error) {
        console.log(error);
     }

    }

}