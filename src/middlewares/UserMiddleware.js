const sessions = require("../model/SessionsModel");
const users = require("../model/UserModel");
const { validateToken } = require("../modules/jwt");


module.exports =async function UserMiddleware (req,res,next){
    try {
        if(!req.cookies.token){
           next(); return ;
        }

        const data = (await validateToken(req.cookies.token))
      if(!data ){
          next(); return;
      }
    //   const user = await users.findOne({_id:data.id})
    //   req.user=user;
      const session = await sessions.findOne({_id:data.session_id}).populate("owner_id")
      
      if(!session){
          next()
          return
      }
      
      req.user=session.owner_id;
      console.log(session);
      next()
      console.log(user);
    } catch (error) {
        
    }
}