var express = require("express")
var router = express.Router()
const { User, Order } = require("../database/index")
const bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
var { destroyToken, tokenIsValid } = require("../common/invalid-token")

const INVALID_TOKENS = {}

const JSON_WEB_TOKEN_KEY = "my-key"

router.post("/logout", (req, res) => {
    try {
        const { token } = req.cookies

        const { userData } = jwt.verify(token, JSON_WEB_TOKEN_KEY)

        destroyToken(token)

        res.json({ message: "logout success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error" })
    }
})

router.get("/create-user", (req, res) => {
    res.render("create-user.pug", { title: "Create User" })
})

router.get("/login", function (req, res, next) {
    res.render("login.pug", { title: "LOGIN" })
})

router.post("/request-token", async function (req, res, next) {
    try {
        const { username, password } = req.body

        /* Username là độc nhất cho mỗi user */
        /*
            Tìm user trong db có username được cung cấp
            Nếu tìm được thì so sánh password
            => Thỏa mãn 2 điều kiện
            => Tạo cho user token và trả về
        */

        const user = await User.findOne({ name: username })

        if (!user) throw new Error("Your account or password is not correct")

        const hashPassword = user.password
        const passwordIsMatch = await bcrypt.compare(password, hashPassword)

        if (passwordIsMatch === false)
            throw new Error("Your account or password is not correct")

        /* 
            Tao token 
            - id cua user    
        */
        const token = await jwt.sign(
            {
                userData: {
                    _id: user._id,
                    username: user.name,
                },
                exp: 60 * 60 * 60 * 60 * 1000,
            },
            JSON_WEB_TOKEN_KEY
        )

        res.cookie("token", token, { maxAge: 900000 })
        return res.json({ message: "Login success", token: token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
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

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) throw Error("Input is not valid")

        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            name: username,
            password: hash,
            advancedMembership: false,
        })

        await User.create(newUser)

        res.json({ message: "You require create new user", username, password })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
