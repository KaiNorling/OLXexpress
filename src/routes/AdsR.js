

const efu = require("express-fileupload")
const { AdsAddGetC, AdsAddPostC, AdsOneGetC } = require("../controllers/AdsRC")
const AuthMiddleware = require("../middlewares/AuthMiddleware")




const router = require("express").Router()

const efuCustom =efu({safeFileNames:true,})


router.get("/add", AuthMiddleware, AdsAddGetC  )

router.post("/add", AuthMiddleware,  efuCustom, AdsAddPostC )

router.get("/:slug",AdsOneGetC )



module.exports = {
    path: "/ads",
    router
}