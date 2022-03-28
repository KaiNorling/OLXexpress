const { CategoryGetC, CategoryAllGetC } = require("../controllers/CategoryRC")

const router = require("express").Router()


 router.get("/", CategoryAllGetC)

router.get("/:id", CategoryGetC )


module.exports = {
    path: "/category",
    router
}