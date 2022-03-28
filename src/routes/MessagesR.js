const { MessagesGetC, MessagesPostC } = require("../controllers/MessagesRC")
const AuthMiddleware = require("../middlewares/AuthMiddleware")

const router = require("express").Router()


router.get("/:id", AuthMiddleware, MessagesGetC)
router.post("/:id", AuthMiddleware, MessagesPostC)


module.exports = {
    path: "/messages",
    router
}