var express = require("express")
var router = express.Router()
const { User, Order } = require("../database/index")

router.get("/create-user", (req, res) => {
    res.render("create-user.pug", { title: "Create User" })
})

/* GET users listing. */
router.get("/:_id", async function (req, res, next) {
    try {
        const { _id } = req.params

        const user = await User.findById(_id)

        if (user === null || user === undefined)
            throw new Error("_id is not exsit")

        res.render("user.pug", { title: "User detail", username: user.name })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.post("/", (req, res) => {
    const { username, password } = req.body

    res.json({ message: "You require create new user", username, password })
})

module.exports = router
