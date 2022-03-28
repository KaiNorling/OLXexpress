const {
    compareHash
} = require("../../modules/bcrypt");
const users = require("../../model/UserModel");
const ads = require("../../model/AdsModel");
const sessions = require("../../model/SessionsModel");
const {
    SignInValidation
} = require("../../modules/validations");
const {
    createToken
} = require("../../modules/jwt");
const {
    ObjectId,
    isValidObjectId
} = require("mongoose");



module.exports = class UserRC {

    static async UserSignInGetC(req, res) {

        try {
            res.render("signin")

        } catch (error) {
            console.log(error);
        }

    }


    static async UserSignInPostC(req, res) {


        try {
            // const  {email,password} = await SignInValidation(req.body)
            const data = await SignInValidation(req.body);
            const user = await users.findOne({
                email: data.email
            });

           //console.log(user);

            if (!user) throw new Error("User not found");

            const isTrust = await compareHash(data.password, user.password);

           // console.log(isTrust);

            if (!isTrust) throw new Error("Password is incorrect");


            // const token = await createToken({	id: user._id,});
            // res.cookie("token", token).redirect("/");

            // res.cookie("token", await createToken({id: user._id,})).redirect("/")
           
            await sessions.deleteMany({owner_id:user._id, user_agent:req.headers["user-agent"]})
            const session = await sessions.create(
                {owner_id:user._id, user_agent:req.headers["user-agent"]})
              //  console.log(session);
            await res.cookie("token", await createToken({session_id: session._id,})).redirect("/")

        } catch (error) {
            console.log(error);
            res.render("signin", {
                error: error + ""
            })
        }



        

    }


    static async UserGetExitC(req, res) {

        try {
            res.clearCookie("token").redirect("/")

        } catch (error) {
            console.log(error);
        }

    }

      static async UserProfileGetC(req,res){

        try {
            const valid = isValidObjectId(req.params?.id);
            if(!valid){
                res.redirect("/");
                return 0;
            }
            const user =await users.findById(req.params?.id)

            if(!user){res.redirect("/");return 0}

            const user_ads = await ads.find({owner_id:user._id})

            // const isOwnProfile = req.user._id === user._id
            const isOwnProfile = await req.user._id.equals(user._id) 

            //console.log(req.user._id, user._id);
            res.render("profile",{user:req.user, user_ads, isOwnProfile, profile:user})
        } catch (e ) {
            console.log(e);
            res.render("/users/signup",{error:error})
        }















     }

     static async UserSessionsGetC(req,res){
         try {
             const user_sessions = await sessions.find({owner_id:req.user.id})
            
             res.render("sessions", {
				user: req.user,
				user_sessions,
			});
         } catch (error) {
             console.log(error);
             res.redirect("/")
         }

     }


     static async UserSessionDeleteC(req, res) {
		try {
			const session_id = isValidObjectId(req.params?.id);

			if (!session_id) throw new Error("Session id is invalid");

			let x = await sessions.deleteOne({
				owner_id: req.user._id,
				_id: req.params?.id,
			});

			res.redirect("/users/sessions");
		} catch (error) {
			console.log(error);
			res.redirect("/users/sessions");
		}
	}




    //  static async UserVerifyGetC(req,res){

    //     try {
    //         const { id} = req.params.id
    //         if(!id) throw new Error("VERIFICATION KEY IS INCORRECT")
    //         if(!isValidObjectId(id))throw new Error("VERIFICATION KEY IS INCORRECT")
    //         const user = await users.findOne({_id: id})
    //         if(!user) throw new Error ("Verification key incorrect")

    //       let x=   await users.updateOne({_id:id,}, {isVerified:true})
    //         console.log(x);

    //         res.cookie("token",await createToken({id:user._id})).redirect("/")

    //     } catch (e ) {
    //         console.log(e);
    //         res.render("/users/signin",{error:error})
    //     }

    //  }


    //  static async UserExitGetC (req,res){
    //     res.clearCookie("token".redirect("/"))


    // }




    // static async UserProfileGetC(req,res){

    //     try {

    //         res.render("profile",{user:req.user})

    //     } catch (e ) {
    //         console.log(e);
    //         res.render("/users/signup",{error:error})
    //     }

    //  }

}