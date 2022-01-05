var express = require("express")
var router = express.Router()
var { User, Order } = require("../database/index")

/* GET home page. */
router.get("/", async function (req, res, next) {
    try {
        const users = await User.find()
        res.render("index", { title: "Home page", users })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.get("/chat-list", (req, res) => {
    res.render("chat-list", { data: "Hello world" })
})

module.exports = router
