const { generateCrypt } = require("../../modules/bcrypt");
const users = require("../../model/UserModel");
const { SignUpValidation } = require("../../modules/validations");
const {email: sendEmail} = require("../../modules/email");
const { createToken } = require("../../modules/jwt");
const {ObjectId, isValidObjectId} =require("mongoose");


module.exports= class UserRC{

    static  async  UserSignUpGetC (req,res){
        try {
            res.render("signup")
        } catch (error) {
            console.log(error);
        }

    }

    static  async  UserSignUpPostC (req,res){

        
        try {

            const data = await SignUpValidation(req.body);
            let user = await users.findOne({email: data.email.toLowerCase(),});
        

             if (user ) throw new Error("Email already exists");

	    	user = await users.create({...data,  password: await generateCrypt (data.password),
		    });

        //   await sendEmail (user.email, "Pochtangizni tasdiqlang", `Pochtangzini tasdiqlash uchun link `, `<a href="http://localhost:7000/users/verify/${user._id}">Tasdiqlash</a>`)
       // console.log(`http:localhost:7000/users/verify/${user._id}`);

		    res.redirect("/users/signin");
           // console.log(data);
            //console.log(user);
            
        } catch (error) {
            console.log(error);
            res.render("signup",{error:error + ""})
        }
 
     }


/////////////////////////////////////////////////////////////////////////////////////// SIGN IN ///////////////////////////////////////////////////////////

static async UserVerifyGetC(req,res){

    try {
        const { id} = req.params.id

        if(!id) throw new Error("VERIFICATION KEY IS INCORRECT")
        if(!isValidObjectId(id))throw new Error("VERIFICATION KEY IS INCORRECT")

        const user = await users.findOne({_id: id})
        if(!user) throw new Error ("Verification key incorrect")

      let x=   await users.updateOne({_id:id,}, {isVerified:true})
       // console.log(x);

        res.cookie("token",await createToken ({id:user._id})).redirect("/")

    } catch (e ) {
        console.log(e);
        res.render("/users/signin",{error:error})
    }

 }
 
     

}