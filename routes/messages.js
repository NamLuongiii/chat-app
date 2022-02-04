var express = require("express")
var router = express.Router()
var { User, Order, Message } = require("../database/index")

router.get("/", async (req, res, next) => {
    try {
        const messages = await Message.find({})
        res.json(messages)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        let message = new Message(req.body)
        Message.create(message)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})

module.exports = router
