var app = require("../app")
var http = require("http").Server(app)
var io = require("socket.io")(http)

io.on("connection", () => {
    console.log("a user is connected’")
})

exports.io = io
