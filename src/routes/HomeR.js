const router = require("express").Router()
const { HomeGetC } = require("../controllers/HomeRC")


router.get("/", HomeGetC)


module.exports = {
    path: "/",
    router
}