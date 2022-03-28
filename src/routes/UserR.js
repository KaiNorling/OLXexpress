//  const { UserSignUpGetC, UserSignUpPostC, UserSignInPostC, UserSignInGetC, UserVerifyGetC,UserExitGetC, UserProfileGetC  } = require("../controllers/UserRC")

const { UserSignInGetC, UserSignInPostC, UserGetExitC, UserProfileGetC, UserSessionsGetC, UserSessionDeleteC,   } = require("../controllers/User|Reg|Log/SignInRC")
const { UserSignUpGetC, UserSignUpPostC,UserVerifyGetC } = require("../controllers/User|Reg|Log/SignUpRC")
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const UserMiddleware = require("../middlewares/UserMiddleware")

// const AuthMIddleware = require("../middlewares/AuthMIddleware")

const router = require("express").Router()

//////////////////////////////////////////////////////////////////// REGISTER /////////////////////
router.get("/signup", UserSignUpGetC  )
router.post("/signup", UserSignUpPostC )

//////////////////////////////////////////////////////////////////// LOGIN ///////////////////////
 router.get("/signin",UserSignInGetC      )
 router.post("/signin", UserSignInPostC )

/////////////////////////////////////////////////////////////////// VERIFY /////////////////////////
 router.get("/verify/:id", UserVerifyGetC)

/////////////////////////////////////////////////////////////////// EXIT /////////////////////////
 router.get("/exit", UserGetExitC)



 router.get("/sessions/delete/:id",AuthMiddleware, UserSessionDeleteC )

 router.get("/sessions",AuthMiddleware, UserSessionsGetC)
/////////////////////////////////////////////////////////////////// PROFILE /////////////////////////
 router.get("/:id", AuthMiddleware,   UserProfileGetC)






module.exports = {
    path: "/users",
    router
}