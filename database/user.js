const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    advancedMembership: Boolean,
})

const User = mongoose.model("user", userSchema)

module.exports = { User};