var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Luong Nam" })
})

router.get("/chat-list", (req, res) => {
    res.render("chat-list", { data: "Hello world" })
})

module.exports = router
