var express = require("express")
const jsonwebtoken = require("jsonwebtoken")
var router = express.Router()
var { User, Order } = require("../database/index")

const JSON_WEB_TOKEN_KEY = "my-key"

/* GET home page. */
router.get("/", async function (req, res, next) {
    try {
        const { token } = req.cookies

        const { userData } = jsonwebtoken.verify(token, JSON_WEB_TOKEN_KEY)

        /*
            page >= 1

            items/Page = 5 items

            Index
            0 1 2 3 4 5 6 7 8 9 10

            page 1 => 0 -> 4
            page 2 => 5 -> 9
            page 3 => ....
        
        */

        let { page } = req.query

        if (isNaN(page) || page < 1) page = 1

        const Items_Per_Page = 5

        // Tìm start index
        const startIndex = (page - 1) * Items_Per_Page

        const users = await User.find().skip(startIndex).limit(Items_Per_Page)

        // Tính total pages
        /*
            t = 10 , items/page = 5 => tp = t / items/page = 2
            t = 11 , i = 5 => tp = roundUp(t / i)
        */

        const sizeOfUsers = await User.count()
        const totalPages = Math.round(sizeOfUsers / Items_Per_Page)

        res.render("index.pug", {
            title: "Home page",
            users,
            totalPages: totalPages,
            page: page,
            userData: userData,
        })
    } catch (error) {
        res.render("index-no-permission.pug")
    }
})

router.get("/chat-list", (req, res) => {
    res.render("chat-list", { data: "Hello world" })
})

module.exports = router
